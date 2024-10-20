import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateListQrDto } from '../dtos/student.dto';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class StudentService {
    private _userId: string;
    constructor(
        private prisma: PrismaService,
        private readonly eventsGateway: EventsGateway
    ) { }

    set userId(value: string) {
        this._userId = value;
    }

    async savingListDriverForQr(data:CreateListQrDto) {
        const find = await this.prisma.userQR.findFirst({
            where: {
                code_qr_id: data.id,
                user_id: this._userId
            }
        })
        if (!find) {
            await this.prisma.userQR.create({
                data: {
                    code_qr_id: data.id,
                    user_id: this._userId,
                    date_use: new Date(),
                    created_at: new Date(),
                    updated_at: new Date(),
                    created_by: this._userId,
                    modified_by: this._userId
                }
            })
            console.log('enmitir mensaje')
            this.eventsGateway.server.emit('message', 'ACTUALIZAR');
        } else {
            throw new BadRequestException('El qr ya fué registrado', { cause: 'El qr ya fué registrado', description: 'El qr ya fué registrado' })
        }
    }

    async getActiveBusDriver() {
        const busDriver = await this.prisma.busDriver.findMany({
          where: {
            status: true
          },
          include: {
            route: true,
            car: true
          }
        })
        return busDriver
    }
}
