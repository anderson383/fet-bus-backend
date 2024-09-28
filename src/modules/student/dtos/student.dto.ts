import { ApiProperty } from "@nestjs/swagger";
import {  IsUUID } from "class-validator";

export class CreateListQrDto {
    @IsUUID()
    @ApiProperty({ description: 'Identificador de la asignacion activa del qr', example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;
}
