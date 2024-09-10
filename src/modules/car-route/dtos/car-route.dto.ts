import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsDateString, IsNumber } from "class-validator";

export class CarRouteCreateDto {
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ description: 'Fecha de inicio de la ruta', example: '2021-09-01T00:00:00.000Z' })
    scheduleStart: string;

    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ description: 'Fecha de fin de la ruta', example: '2021-09-01T00:00:00.000Z' })
    scheduleEnd: string;


    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Longitud', example: '23.23' })
    longitude: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Latitud', example: '23.23' })
    lactitude: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: 'Orden', example: '1' })
    order: number;
}

export class CarRouteUpdateDto extends CarRouteCreateDto {
    
}