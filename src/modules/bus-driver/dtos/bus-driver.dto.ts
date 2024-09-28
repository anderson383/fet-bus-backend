import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { BUS_DRIVER_STATUS } from "src/constants/bus-driver";

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
    @IsString()
    @ApiProperty({ description: 'Estado de la ruta', example: 'stop' })
    status_route: string;
}


export class BusDriverUpdateDto extends BusDriverCreateDto {

}

export class BusDriverUpdateStatusDto {
    @IsUUID()
    @ApiProperty({ description: 'Identificador del conductor', example: '123e4567-e89b-12d3-a456-426614174000' })
    bus_driver_id: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Estado de la ruta', example: 'stop' })
    status: typeof BUS_DRIVER_STATUS['PICKING'] | typeof BUS_DRIVER_STATUS['STOP'] | typeof BUS_DRIVER_STATUS['DRIVING'];
}