import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateListQrDto } from '../dtos/student.dto';

@Injectable()
export class StudentService {
    private _userId: string;
    constructor(
        private prisma: PrismaService
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
        } else {
            throw new BadRequestException('Ya esta registrado')
        }
    }
}
