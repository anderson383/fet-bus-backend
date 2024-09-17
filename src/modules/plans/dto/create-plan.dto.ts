import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";


export class CreatePlanDto {
    @IsString()
    @ApiProperty({ description: 'Nombre del plan', example: 'Plan A' })
    name: string;

    @IsNumber()
    @ApiProperty({ description: 'Valor por dia', example: 10000 })
    amount_perday: number;

    @IsNumber()
    @ApiProperty({ description: 'Cantidad de dias', example: 30 })
    equals_day: number;
}
