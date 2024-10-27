
import { BadRequestException, Body, Controller, Delete, Get, Param, ParseFilePipe, Post, Put, Query, Request, SetMetadata, UploadedFile, UploadedFiles, UseGuards, UseInterceptors,  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IMulterFile } from 'src/types/multer';
import { FileTypeValidator } from 'src/constants/validators/file-validator';
import { TransactionService } from '../services/transaction.service';
import { STATUS_TRANSACTION } from 'src/constants/status';
import { PlansService } from 'src/modules/plans/services/plans.service';
import { StudentGuard } from 'src/modules/auth/guards/student.guard';
import { EventsGateway } from 'src/events/events.gateway';
import { AuthService } from 'src/modules/auth/services/auth.service';

export interface FilesDataCar {
  tarjeta_de_propietario: IMulterFile[]
  seguro: IMulterFile[]
  seguro_todo_riesgo: IMulterFile[]
  tecnomecanica: IMulterFile[]
}

@Controller('payment')
@ApiTags('Creacion de pago')
@UseGuards(AuthGuard, StudentGuard)
export class PaymentController {

  constructor(
    private readonly transactionService: TransactionService,
    private readonly planService: PlansService,
    private readonly eventsGateway: EventsGateway,
    private readonly authService: AuthService
  ) {}

  @Get('/get-plans')
  async getPlansEstudents(@Request() req) {
    return this.planService.findAll()
  }

  @Get('/checkout')
  @UseGuards()
  @SetMetadata('isPublic', true)  // Marca la ruta como pública
  async checkoutPayment(@Request() req, @Query() queryParams) {
    const validDataPayment = await this.transactionService.validTransaction(queryParams.id)
    if (validDataPayment && validDataPayment.status === STATUS_TRANSACTION.APPROVED) {
      const transaction = await this.transactionService.getTransactionForRerence(validDataPayment.reference)

      if (transaction) {
        await this.transactionService.updateTransaction(transaction.id, STATUS_TRANSACTION.APPROVED)
        await this.planService.createPlanForEstudent(transaction.user_id, transaction)
        await this.eventsGateway.server.emit('message', 'UPDATE_PLAN');

      }
      console.log(transaction)
      
    }
    return true
  }

  @Get('/get-active-plan')
  async getActivePlan(@Request() req) {
    this.planService.userId = req.user.id
    const activePlan = await this.planService.findOneActiveForUser()
    return {
      ...activePlan,
      ...(await this.authService.getTokens({
        ...req.user,
        active_plan: activePlan
      }).catch(e => {
        console.log(e)
      }))
    }
  }

  @Post('/create-payment/:planId')
  async create(
    @Request() req,
    @Param('planId') planId: string
  ) {
    this.transactionService.userId = req.user.id
    const planData = await this.planService.findOne(planId)
    const newTransaction = await this.transactionService.initReference(planData)
    const totalPayment = (planData.equals_day * planData.amount_perday) * 100 
    try {
      this.transactionService.reference = newTransaction.reference
  
      const signature = await this.transactionService.generateSignature(totalPayment )
      return {
        reference: newTransaction.reference,
        signature,
        totalPayment
      }
    } catch (error) {
      console.log(error)
      return new BadRequestException({ status: STATUS_TRANSACTION.REJECTED, 'message': 'Payment rejected' })
    }
  }

}
