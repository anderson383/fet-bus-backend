import { ApiProperty } from "@nestjs/swagger";

export class CarRouteResponseDto {
    @ApiProperty({ description: 'Id de la ruta de bus', example: '1' })
    id: string;

    @ApiProperty({ description: 'Fecha de inicio de la ruta', example: '08:30'  })
    scheduleStart: string;

    @ApiProperty({ description: 'Fecha de fin de la ruta', example: '10:45' })
    scheduleEnd: string;

    @ApiProperty({ description: 'Longitud', example: '23.23' })
    longitude: number;

    @ApiProperty({ description: 'Latitud', example: '23.23' })
    lactitude: number;

    @ApiProperty({ description: 'Orden', example: '1' })
    order: number;
}


export class CarRouteMapper {
    static toResponse(route: any): CarRouteResponseDto {
        const formatTime = (date: Date) => date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        return {
            id: route.id,
            scheduleStart: formatTime(route.schedule_start),
            scheduleEnd: formatTime(route.schedule_end),
            longitude: route.longitude,
            lactitude: route.lactitude,
            order: route.order
        }
    }
}