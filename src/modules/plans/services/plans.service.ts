import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { addBusinessDays, newDateTz } from 'src/constants/format-dates';
import { STATUS_TRANSACTION } from 'src/constants/status';

@Injectable()
export class PlansService {

  private _userId: string;

  set userId(value: string) {
    this._userId = value;
  }

  constructor(private prisma: PrismaService) { }

  createPlanForEstudent(user_id: string, transaction: any) {
    return this.prisma.userPlan.create({
      data: {
        status_plan: true,
        created_at: new Date(),
        transaction_id: transaction.id,
        user_id: user_id,
        updated_at: new Date(),
        status: true,
        date_start: new Date(),
        date_end: addBusinessDays(new Date(), Number(transaction.plan.equals_day)),
      }
    })
  }
  create(createPlanDto: CreatePlanDto) {
    return this.prisma.plans.create({
      data: {
        created_by: this._userId,
        modified_by: this._userId,
        name: createPlanDto.name,
        amount_perday: createPlanDto.amount_perday,
        equals_day: createPlanDto.equals_day,
      }
    });
  }

  findOneActiveForUser () {
    return this.prisma.userPlan.findFirst({
      where: {
        status: true,
        status_plan: true,
        user_id: this._userId,
        transaction: {
          statusTransaction: STATUS_TRANSACTION.APPROVED
        }
      }
    })
  }

  findAll() {
    return this.prisma.plans.findMany({
      where: {
        status: true
      }
    });
  }

  findOne(id: string) {
    return this.prisma.plans.findUnique({
      where: {
        id: id,
        status: true
      }
    });
  }

  update(id: string, updatePlanDto: UpdatePlanDto) {
    return this.prisma.plans.update({
      where: {
        id: id
      },
      data: {
        modified_by: this._userId,
        updated_at: new Date(),
        name: updatePlanDto.name,
        amount_perday: updatePlanDto.amount_perday,
        equals_day: updatePlanDto.equals_day,
      }
    });
  }

  remove(id: string) {
    return this.prisma.plans.update({
      where: {
        id: id
      },
      data: {
        status: false,
        updated_at: new Date(),
        modified_by: this._userId
      }
    });
  }
}
