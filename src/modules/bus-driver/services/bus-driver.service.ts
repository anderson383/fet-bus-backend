import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { BusDriverCreateDto, BusDriverUpdateDto } from '../dtos/bus-driver.dto';
import { ROLES } from 'src/constants/roles';
import { CarService } from 'src/modules/config/services/car.service';
import { CarRouteService } from 'src/modules/car-route/services/car-route.service';
import { FilesDataBusDriver } from '../controllers/bus-driver.controller';
import { S3Service } from 'src/modules/common/services/aws-s3.service';


@Injectable()
export class BusDriverService {
    private _userId: string;
    constructor(
        private prisma: PrismaService,
        private carService: CarService,
        private carRouteService: CarRouteService,
        private s3Service: S3Service
    ) { }

    set userId(value: string) {
        this._userId = value;
    }

    findAll() {
        return this.prisma.busDriver.findMany({
            where: {
                status: true
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
                        company: {
                            select: {
                                name: true
                            }
                        },
                        type: {
                            select: {
                                name: true
                            }
                        },
                    }
                },
                route: {
                    select: {
                        name: true,
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
                        company: {
                            select: {
                                name: true
                            }
                        },
                        type: {
                            select: {
                                name: true
                            }
                        },
                    }
                },
                route: {
                    select: {
                        name: true,
                        schedule_start: true,
                        schedule_end: true,

                    }
                }
            }
        })
    }

    async create(data: BusDriverCreateDto, files: FilesDataBusDriver) {
        await this.validateDriver(data.driver_id);
        await this.validateCar(data.car_id);
        await this.validateRoute(data.route_id);
        
        const busDriver = await this.prisma.busDriver.create({
            data: {
                driver_id: data.driver_id,
                car_id: data.car_id,
                route_id: data.route_id,
                status_route: data.status_route,
                created_at: new Date(),
                created_by: this._userId,
                modified_by: this._userId
            }
        });

        if(busDriver) {
            const urlLicense = await this.s3Service.uploadFile(files.license[0], 'drivers-documents/' + busDriver.id + '/');
    
            const busDriverUpdate = await this.prisma.busDriver.update({
                where: { id: busDriver.id },
                data: {
                    license: urlLicense,
                }
            });
            return busDriverUpdate;
        }
    }

    async update(id: string, data: BusDriverUpdateDto, files: FilesDataBusDriver) {
        await this.validateDriver(data.driver_id);
        await this.validateCar(data.car_id);
        await this.validateRoute(data.route_id);

        const documentTypes = ['license'];

        const updateFiles: any = {};

        for (const docType of documentTypes) {
            if (files[docType] && files[docType].length){
                const url = await this.s3Service.uploadFile(files[docType][0], 'drivers-documents/' + id + '/');
                updateFiles[docType] = url ? url : null;
            }
        }
        
        return this.prisma.busDriver.update({
            where: { status: true, id },
            data: {
                driver_id: data.driver_id,
                car_id: data.car_id,
                route_id: data.route_id,
                status_route: data.status_route,
                updated_at: new Date(),
                modified_by: this._userId,
                ...updateFiles
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
