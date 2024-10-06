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
import { FilesDataCar } from '../controllers/car.controller';
import { S3Service } from 'src/modules/common/services/aws-s3.service';

@Injectable()
export class CarService {

  private _userId: string
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service
  ) {}

  set userId (value: string) {
    this._userId = value
  }

  async createCar (data: CarCreateDto, files: FilesDataCar) {
    const findCar = await this.getCarForPlaca(data.placa)

    if (findCar) {
      throw new HttpException(`El carro con la placa '${data.placa}' ya existe`, 400)
    }
    const carCreate = await this.prisma.car.create({
      data: {
        created_by: this._userId,
        modified_by: this._userId,
        color: data.color,
        placa: data.placa,
        company_id: data.company,
        size: Number(data.size),
        type_id: data.type,
        updated_at: new Date(),
      }
    })

    if (carCreate) {
      const urlTarjeta = await this.s3Service.uploadFile(files.tarjeta_de_propietario[0], 'documentos-carros/' + carCreate.id + '/')
      const urlSeguro = await this.s3Service.uploadFile(files.seguro[0], 'documentos-carros/' +  carCreate.id + '/')
      const urlSeguroTodoRiesgo = await this.s3Service.uploadFile(files.seguro_todo_riesgo[0], 'documentos-carros/' +  carCreate.id + '/')
      const urlTecnomecanica = await this.s3Service.uploadFile(files.tecnomecanica[0], 'documentos-carros/' + carCreate.id + '/')

      const carUpdate = await this.prisma.car.update({
        where: {
          id: carCreate.id
        },
        data: {
          tarjeta_de_propietario: urlTarjeta,
          seguro: urlSeguro,
          seguro_todo_riesgo: urlSeguroTodoRiesgo,
          tecnomecanica: urlTecnomecanica
        }
      })
      return carUpdate
    }
  }

  async editCardForId (data: CarUpdateDto, id:string, files: FilesDataCar) {

    const findCar = await this.getCarForPlaca(data.placa)
    if (findCar && findCar.id !== id) {
      throw new HttpException(`El carro con la placa '${data.placa}' ya existe`, 400)
    }
    const updateFiles:any = {}
    
    if (files.tarjeta_de_propietario && files.tarjeta_de_propietario.length) {
      const urlTarjeta = await this.s3Service.uploadFile(files.tarjeta_de_propietario[0], 'documentos-carros/' + findCar.id + '/')
      updateFiles.tarjeta_de_propietario = urlTarjeta ? urlTarjeta : null
    }
    if (files.seguro && files.seguro.length) {
      const urlSeguro = await this.s3Service.uploadFile(files.seguro[0], 'documentos-carros/' +  findCar.id + '/')
      updateFiles.seguro = urlSeguro ? urlSeguro : null
    }
    if (files.seguro_todo_riesgo && files.seguro_todo_riesgo.length) {
      const urlSeguroTodoRiesgo = await this.s3Service.uploadFile(files.seguro_todo_riesgo[0], 'documentos-carros/' +  findCar.id + '/')
      updateFiles.seguro_todo_riesgo = urlSeguroTodoRiesgo ? urlSeguroTodoRiesgo : null
    }
    if (files.tecnomecanica && files.tecnomecanica.length) {
      const urlTecnomecanica = await this.s3Service.uploadFile(files.tecnomecanica[0], 'documentos-carros/' + findCar.id + '/')
      updateFiles.tecnomecanica = urlTecnomecanica ? urlTecnomecanica : null
    }

    return this.prisma.car.update({
      where: {id, status: true},
      data: {
        modified_by: this._userId,
        updated_at: new Date(),
        type_id: data.type,
        color: data.color,
        size: Number(data.size),
        company_id: data.company,
        placa: data.placa,
        ...updateFiles
      }
    }).catch(err => {
      console.log(err)
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
