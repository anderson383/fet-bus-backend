import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { IsTimeString } from "../validators/is-time-string.validator";

export class CarRouteCreateDto {

    @IsNotEmpty()
    @ApiProperty({ description: 'Nombre de la ruta', example: 'Ruta 1' })
    name: string;

    @IsNotEmpty()
    @IsTimeString()
    @ApiProperty({ description: 'Fecha de inicio de la ruta', example: '08:30'  })
    scheduleStart: string;

    @IsNotEmpty()
    @IsTimeString()
    @ApiProperty({ description: 'Fecha de fin de la ruta', example: '10:45' })
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