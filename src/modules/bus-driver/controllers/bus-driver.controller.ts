import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { BusDriverService } from '../services/bus-driver.service';
import { BusDriverCreateDto, BusDriverUpdateDto } from '../dtos/bus-driver.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';

@Controller('bus-driver')
@ApiTags('Controlador de conductores de autobuses')
@UseGuards(AuthGuard, AdminGuard)
export class BusDriverController {
    constructor(private busDriverService: BusDriverService) { }

    @Get()
    @ApiOperation({
        summary: 'Obtener todos los conductores de autobuses.',
    })
    getAllBusDrivers() {
        return this.busDriverService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Obtener un conductor de autobús por su id.',
    })
    getBusDriver(@Param('id') id: string) {
        return this.busDriverService.findOne(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Crear un nuevo conductor de autobús.',
    })
    createBusDriver(@Body() data: BusDriverCreateDto, @Req() req) {
        this.busDriverService.userId = req.user.id;
        return this.busDriverService.create(data);
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Actualizar un conductor de autobús por su id.',
    })
    updateBusDriver(@Param('id') id: string, @Body() data: BusDriverUpdateDto, @Req() req) {
        this.busDriverService.userId = req.user.id;
        return this.busDriverService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar un conductor de autobús por su id.',
    })
    deleteBusDriver(@Param('id') id: string, @Req() req) {
        this.busDriverService.userId = req.user.id;
        return this.busDriverService.delete(id);
    }
}
