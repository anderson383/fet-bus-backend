import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { BusDriverCreateDto, BusDriverUpdateDto, BusDriverUpdateStatusDto } from '../dtos/bus-driver.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DriverBusGuard } from 'src/modules/auth/guards/driver_bus.guard';
import { BusDriverManagerService } from '../services/bus-driver-manager.service';

@Controller('bus-driver-manager')
@UseGuards(AuthGuard, DriverBusGuard)
export class BusDriverManagerController {
    constructor(private busDriverService: BusDriverManagerService) { }

    @Post('generate-qr')
    @ApiOperation({
        summary: 'Crear un nuevo conductor de autobús.',
    })
    generateQrStatusBus(@Body() data: BusDriverUpdateStatusDto, @Req() req) {
        this.busDriverService.userId = req.user.id;
        return this.busDriverService.updateStatusDriver(data);
    }

    @Get('get-assigned-driver')
    getAssingedBusDriver(@Req() req) {
        this.busDriverService.userId = req.user.id;
        return this.busDriverService.getAssingedBusDriver();
    }

    @Get('get-users-register/:id')
    getUsersRegister(@Param('id') id: string, @Req() req) {
        this.busDriverService.userId = req.user.id;
        return this.busDriverService.getUsersRegister(id);
    }
}
