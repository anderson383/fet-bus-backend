import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { BusDriverCreateDto, BusDriverUpdateDto } from '../dtos/bus-driver.dto';
import { ROLES } from 'src/constants/roles';
import { CarService } from 'src/modules/config/services/car.service';
import { CarRouteService } from 'src/modules/car-route/services/car-route.service';


@Injectable()
export class BusDriverService {
    private _userId: string;
    constructor(
        private prisma: PrismaService,
        private carService: CarService,
        private carRouteService: CarRouteService
    ) { }

    set userId(value: string) {
        this._userId = value;
    }

    findAll() {
        return this.prisma.busDriver.findMany({
            include: {
                driver: {
                    select: {
                        full_name: true,
                        last_name: true,
                    }
                },
                car: {
                    select: {
                        placa: true,
                        color: true,
                    }
                },
                route: {
                    select: {
                        schedule_start: true,
                        schedule_end: true,

                    }
                }
            }
        });
    }

    findOne(id: string) {
        return this.prisma.busDriver.findUnique({
            where: {
                status: true,
                id
            },
            include: {
                driver: {
                    select: {
                        full_name: true,
                        last_name: true,
                    }
                },
                car: {
                    select: {
                        placa: true,
                        color: true,
                    }
                },
                route: {
                    select: {
                        schedule_start: true,
                        schedule_end: true,

                    }
                }
            }
        })
    }

    async create(data: BusDriverCreateDto) {
        await this.validateDriver(data.driver_id);
        await this.validateCar(data.car_id);
        await this.validateRoute(data.route_id);
        
        return this.prisma.busDriver.create({
            data: {
                driver_id: data.driver_id,
                car_id: data.car_id,
                route_id: data.route_id,
                arrived: data.arrived,
                created_at: new Date(),
                created_by: this._userId,
                modified_by: this._userId
            }
        });
    }

    async update(id: string, data: BusDriverUpdateDto) {
        await this.validateDriver(data.driver_id);
        await this.validateCar(data.car_id);
        await this.validateRoute(data.route_id);
        
        return this.prisma.busDriver.update({
            where: { status: true, id },
            data: {
                driver_id: data.driver_id,
                car_id: data.car_id,
                route_id: data.route_id,
                arrived: data.arrived,
                updated_at: new Date(),
                modified_by: this._userId
            }
        });
    }

    delete(id: string) {
        return this.prisma.busDriver.update({
            where: { id },
            data: {
                status: false,
                updated_at: new Date(),
                modified_by: this._userId
            }
        });
    }

    async validateDriver(driver_id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: driver_id,
                status: true
            },
            include: {
                rol: true
            }
        });

        if (!user) {
            throw new NotFoundException('El conductor no existe.');
        }

        if (user.rol.code !== ROLES.DRIVER_BUS) {
            throw new BadRequestException('El usuario no es un conductor de autobús.');
        }
    }

    async validateCar(car_id: string) {
        const car = await this.carService.getCardForId(car_id);
        if (!car) {
            throw new NotFoundException('El carro no existe.');
        }
    }

    async validateRoute(route_id: string) {
        const route = await this.carRouteService.findCarRouteById(route_id);
        if (!route) {
            throw new NotFoundException('La ruta no existe.');
        }
    }

}
