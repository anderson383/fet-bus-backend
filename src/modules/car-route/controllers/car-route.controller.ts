import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CarRouteService } from "../services/car-route.service";
import { CarRouteCreateDto, CarRouteUpdateDto } from "../dtos/car-route.dto";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { AdminGuard } from "src/modules/auth/guards/admin.guard";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller("car-route")
@ApiTags("Controlador de rutas de bus")
@UseGuards(AuthGuard, AdminGuard)
export class CarRouteController {
    constructor(private carRouteService: CarRouteService) { }

    @Get()
    @ApiOperation({
        summary: 'Obtener todas las rutas de bus.',
    })
    async getCarRoutes() {
        return await this.carRouteService.findAllCarRoutes();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Obtener una ruta de bus por su id.',
    })
    async getCarRoute(@Param('id') id: string) {
        return await this.carRouteService.findCarRouteById(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Crear una nueva ruta de bus.',
    })
    createCarRoute(@Body() data: CarRouteCreateDto, @Req() req) {
        this.carRouteService.userId = req.user.id;
        return this.carRouteService.createCarRoute(data);
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Actualizar una ruta de bus por su id.',
    })
    updateCarRoute(@Body() data: CarRouteUpdateDto, @Param('id') id: string, @Req() req) {
        this.carRouteService.userId = req.user.id;
        return this.carRouteService.updateCarRouteById(id, data);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar una ruta de bus por su id.',
    })
    deleteCarRoute(@Param('id') id: string, @Req() req) {
        this.carRouteService.userId = req.user.id;
        return this.carRouteService.deleteCarRouteById(id);
    }
}