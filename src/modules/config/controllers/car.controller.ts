
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards,  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarService } from '../services/car.service';
import { CarCreateDto, CarUpdateDto } from '../dtos/car.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';

@Controller('config/car')
@ApiTags('Controlador de configuracion de carros')
@UseGuards(AuthGuard, AdminGuard)
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  async create(@Body() carData: CarCreateDto, @Request() req) {
    this.carService.userId = req.user.id
    return this.carService.createCar(carData);
  }

  @Get()
  async getCarList(id, @Request() req){
    this.carService.userId = req.user.id
    return this.carService.getCarList();
  }

  @Get(':id')
  async getCar(@Param('id') id, @Request() req){
    this.carService.userId = req.user.id
    return this.carService.getCardForId(id);
  }


  @Put(':id')
  async editCar(@Body() carData: CarUpdateDto, @Param('id') id, @Request() req){
    this.carService.userId = req.user.id
    return this.carService.editCardForId(carData, id);
  }


  @Delete(':id')
  async deleteCar(@Param('id') id, @Request() req){
    this.carService.userId = req.user.id
    return this.carService.deleteCarForId(id);
  }
}
