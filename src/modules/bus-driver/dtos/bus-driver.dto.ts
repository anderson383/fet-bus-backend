import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class BusDriverCreateDto {

    @IsUUID()
    @ApiProperty({ description: 'Identificador del conductor', example: '123e4567-e89b-12d3-a456-426614174000' })
    driver_id: string;

    @IsUUID()
    @ApiProperty({ description: 'Identificador del autobus', example: '123e4567-e89b-12d3-a456-426614174000' })
    car_id: string;

    @IsUUID()
    @ApiProperty({ description: 'Identificador de la ruta', example: '123e4567-e89b-12d3-a456-426614174000' })
    route_id: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ description: 'Estado de la ruta', example: 'true' })
    arrived: boolean;
}


export class BusDriverUpdateDto extends BusDriverCreateDto {

}