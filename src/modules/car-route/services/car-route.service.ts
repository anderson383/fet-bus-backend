import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { CarRouteCreateDto, CarRouteUpdateDto } from "../dtos/car-route.dto";

@Injectable()
export class CarRouteService {
    private _userId: string;
    constructor(private prisma: PrismaService) { }

    set userId(value: string) {
        this._userId = value;
    }

    findAllCarRoutes() {
        return this.prisma.carRoute.findMany({
            where: {
                status: true
            }
        });
    }

    findCarRouteById(id: string) {
        return this.prisma.carRoute.findFirst({
            where: {
                status: true,
                id
            }
        });
    }

    async createCarRoute(data: CarRouteCreateDto) {
        return this.prisma.carRoute.create({
            data: {
                schedule_start: new Date(data.scheduleStart),
                schedule_end: new Date(data.scheduleEnd),
                longitude: data.longitude,
                lactitude: data.lactitude,
                order: data.order,
                status: true,
                created_by: this._userId,
                modified_by: this._userId
            }
        }).catch(err => {
            throw new BadRequestException('error al crear la ruta de bus: ' + err.message);
        })
    }

    updateCarRouteById(id: string, data: CarRouteUpdateDto) {
        return this.prisma.carRoute.update({
            where: { id, status: true },
            data: {
                schedule_start: new Date(data.scheduleStart),
                schedule_end: new Date(data.scheduleEnd),
                longitude: data.longitude,
                lactitude: data.lactitude,
                order: data.order,
                updated_at: new Date(),
                modified_by: this._userId
            }
        })
    }

    deleteCarRouteById(id: string) {
        return this.prisma.carRoute.update({
            where: {
                id
            },
            data: {
                status: false,
                updated_at: new Date(),
                modified_by: this._userId
            }
        })
    }
}