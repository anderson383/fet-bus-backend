import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PlansService {

  private _userId: string;

  set userId(value: string) {
    this._userId = value;
  }

  constructor(private prisma: PrismaService) { }

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
