import {
  Injectable,
  HttpException
} from '@nestjs/common';
import { Rol, User } from '@prisma/client';
import { AuthCreateUserDto } from 'src/modules/auth/dtos/auth.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { hashSync } from 'bcrypt';
import { ROLES } from 'src/constants/roles';
import { CarCreateDto, CarUpdateDto } from '../dtos/car.dto';

@Injectable()
export class CarService {

  private _userId: string
  constructor(
    private prisma: PrismaService
  ) {}

  set userId (value: string) {
    this._userId = value
  }

  async createCar (data: CarCreateDto) {

    const findCar = await this.getCarForPlaca(data.placa)

    if (findCar) {
      throw new HttpException(`El carro con la placa '${data.placa}' ya existe`, 400)
    }

    return this.prisma.car.create({
      data: {
        created_by: this._userId,
        modified_by: this._userId,
        color: data.color,
        placa: data.placa,
        company_id: data.company,
        size: data.size,
        type_id: data.type,
        updated_at: new Date(),
      }
    }).catch(err => {
      console.log(err)
    })
  }

  async editCardForId (data: CarUpdateDto, id:string) {

    const findCar = await this.getCarForPlaca(data.placa)
    if (findCar && findCar.id !== id) {
      throw new HttpException(`El carro con la placa '${data.placa}' ya existe`, 400)
    }
    
    return this.prisma.car.update({
      where: {id, status: true},
      data: {
        modified_by: this._userId,
        updated_at: new Date(),
        type_id: data.type,
        color: data.color,
        size: data.size,
        company_id: data.company,
        placa: data.placa,
      }
    })
  }

  getCarForPlaca (placa: string) {
    return this.prisma.car.findUnique({
      where: {
        placa
      }
    })
  }

  getCarList () {
    return this.prisma.car.findMany({
      where: {
        status: true
      },
      include: {
        company: {
          select: {
            id: true,
            code: true,
            name: true
          }
        },
        type: {
          select: {
            id: true,
            code: true,
            name: true
          }
        }
      }
    })
  }

  getCardForId (id:string) {
    return this.prisma.car.findFirst({
      where: {
        status: true,
        id
      },
      include: {
        company: {
          select: {
            id: true,
            code: true,
            name: true
          }
        },
        type: {
          select: {
            id: true,
            code: true,
            name: true
          }
        }
      }
    })
  }

  deleteCarForId (id:string) {
    return this.prisma.car.update({
      where: {
        id
      },
      data: {
        updated_at: new Date(),
        modified_by: this._userId,
        status: false
      }
    })
  }

}
