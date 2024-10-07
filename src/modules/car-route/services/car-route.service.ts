import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { CarRouteCreateDto, CarRouteUpdateDto } from "../dtos/car-route.dto";
import { CarRouteMapper } from "../dtos/car-route-response.dto";

@Injectable()
export class CarRouteService {
    private _userId: string;
    constructor(private prisma: PrismaService) { }

    set userId(value: string) {
        this._userId = value;
    }

    async findAllCarRoutes() {
        const routes = await this.prisma.carRoute.findMany({
            where: {
                status: true
            }
        });

        return routes.map(route => CarRouteMapper.toResponse(route));
    }

    async findCarRouteById(id: string) {
        const route = await  this.prisma.carRoute.findFirst({
            where: {
                status: true,
                id
            }
        });

        if (!route) {
            throw new BadRequestException('No se encontró la ruta de bus');
        }

        return CarRouteMapper.toResponse(route);
    }

    async createCarRoute(data: CarRouteCreateDto) {
        const scheduleStart = this.convertToDateTime(data.scheduleStart);
        const scheduleEnd = this.convertToDateTime(data.scheduleEnd);
        return this.prisma.carRoute.create({
            data: {
                name: data.name,
                schedule_start: scheduleStart,
                schedule_end: scheduleEnd,
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
        const scheduleStart = this.convertToDateTime(data.scheduleStart);
        const scheduleEnd = this.convertToDateTime(data.scheduleEnd);
        return this.prisma.carRoute.update({
            where: { id, status: true },
            data: {
                name: data.name,
                schedule_start: scheduleStart,
                schedule_end: scheduleEnd,
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

    convertToDateTime(time: string) {
        const baseDate = '1970-01-01';
        return new Date(`${baseDate}T${time}:00`)
    }
}