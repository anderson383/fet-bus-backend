
import { BadRequestException, Body, Controller, Delete, Get, Param, ParseFilePipe, Post, Put, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors,  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IMulterFile } from 'src/types/multer';
import { FileTypeValidator } from 'src/constants/validators/file-validator';
import { TransactionService } from '../services/transaction.service';
import { STATUS_TRANSACTION } from 'src/constants/status';
import { PlansService } from 'src/modules/plans/services/plans.service';

export interface FilesDataCar {
  tarjeta_de_propietario: IMulterFile[]
  seguro: IMulterFile[]
  seguro_todo_riesgo: IMulterFile[]
  tecnomecanica: IMulterFile[]
}

@Controller('payment')
@ApiTags('Creacion de pago')
@UseGuards(AuthGuard)
export class PaymentController {

  constructor(
    private readonly transactionService: TransactionService,
    private readonly planService: PlansService
  ) {}

  @Post('/create-payment')
  async create(@Request() req) {
    console.log('enre')
    this.transactionService.userId = req.user.id
    console.log('enre333')
    const planId = 'b5bc99b4-4657-4921-aac8-df9936381d01';
    console.log('enre')
    const planData = await this.planService.findOne(planId)
    console.log(planData)
    const newTransaction = await this.transactionService.initReference(planData)
    const totalPayment = (planData.equals_day * planData.amount_perday) * 100 
    try {
      
      this.transactionService.reference = newTransaction.reference
  
      // await this.transactionService.tokenizeTarjetCard(creditCard)
  
      // await this.transactionService.getObtainToken()
  
      const signature = await this.transactionService.generateSignature(totalPayment )
      return {
        reference: newTransaction.reference,
        signature,
        totalPayment
      }
      // const transactionProvider = await this._paymentRepository.createTransaction(customer.email)
  
      // const customerSaved = await this._repositoryCustomer.create(customer)
  
      // const shippingData = await this._repositoryShippingAddress.create({
      //   address: shippingAddress.address,
      //   city: shippingAddress.city,
      //   customerId:customerSaved.id,
      //   deparment: shippingAddress.deparment,
      //   phone: shippingAddress.phone,
      //   productId: productData.id
      // })
      
      // await this._transactionRepository.updateTransaction(newTransaction.id, {
      //   referenceProvider: transactionProvider.data.id,
      //   status_transaction: transactionProvider.data.status,
      //   shippingId: shippingData.id
      // })
  
      return {
        // transactionId: newTransaction.id,
        // transactionProviderId: transactionProvider.data.id,
        // productId: productData.id
      }
    } catch (error) {
      console.log(error)
      return new BadRequestException({ status: STATUS_TRANSACTION.REJECTED, 'message': 'Payment rejected' })
    }
  }

}
