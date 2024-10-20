import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { BusDriverCreateDto, BusDriverUpdateDto, BusDriverUpdateStatusDto } from '../dtos/bus-driver.dto';
import { ROLES } from 'src/constants/roles';
import { CarService } from 'src/modules/config/services/car.service';
import { CarRouteService } from 'src/modules/car-route/services/car-route.service';
import { BusDriverService } from './bus-driver.service';
import { BUS_DRIVER_STATUS } from 'src/constants/bus-driver';


@Injectable()
export class BusDriverManagerService {
  private _userId: string;
  constructor(
      private prisma: PrismaService,
      private carService: CarService,
      private carRouteService: CarRouteService,
      private busDriverService: BusDriverService
  ) { }

  set userId(value: string) {
      this._userId = value;
  }

  async getAssingedBusDriver() {
    const busDriver = await this.prisma.busDriver.findMany({
      where: {
        driver_id: this._userId,
      },
      include: {
        route: true,
        car: true
      }
    })
    return busDriver
  }
  async getUsersRegister (idCodeQR : string) {
    const busDriver = await this.prisma.userQR.findMany({
      where: {
        code_qr_id: idCodeQR
      },
      include: {
        user: true
      }
    })
    return busDriver
  }

  async updateStatusDriver(data: BusDriverUpdateStatusDto) {
    const busDriver = await this.busDriverService.findOne(data.bus_driver_id)

    if (busDriver) {
      const dataSaving = await this.prisma.busDriver.update({
        where: { id: busDriver.id, status: true },
        data: {
          status_route: data.status,
        }
      });
      console.log(dataSaving)
      if (dataSaving.status_route === BUS_DRIVER_STATUS.PICKING) {
        const codeQr = await this.prisma.codeQR.findFirst({
          where: {
            bus_driver_id: busDriver.id
          }
        })
        let dataCodeQR:any = {}
        if (!codeQr) {
          dataCodeQR = await this.prisma.codeQR.create({
            data: {
              status: true,
              modified_by: this._userId,
              created_by: this._userId,
              date_activate: new Date(),
              updated_at: new Date(),
              date_deactivate: null,
              bus_driver_id: dataSaving.id,
              created_at: new Date()
            }
          })
        }  else {
          dataCodeQR = codeQr
        }
        return {
          id: dataCodeQR.id,
          date_activate: dataCodeQR.date_activate
        }
      }
    }
  }
}
