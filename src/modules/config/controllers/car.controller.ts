
import { Body, Controller, Delete, Get, Param, ParseFilePipe, Post, Put, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors,  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarService } from '../services/car.service';
import { CarCreateDto, CarUpdateDto } from '../dtos/car.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IMulterFile } from 'src/types/multer';

interface FilesDataCar {
  tarjeta_de_propietario: CarCreateDto
  seguro: CarCreateDto
  seguro_todo_riesgo: CarCreateDto
  licencia_conducir: CarCreateDto
  tecnomecanica: CarCreateDto
}

@Controller('config/car')
@ApiTags('Controlador de configuracion de carros')
@UseGuards(AuthGuard, AdminGuard)
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'tarjeta_de_propietario' },
      { name: 'seguro' },
      { name: 'seguro_todo_riesgo' },
      { name: 'licencia_conducir' },
      { name: 'tecnomecanica' },
    ])
    // FileInterceptor('file'), FilesInterceptor('files')
  )
  async create(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: []
      }),
    )
      filesData: FilesDataCar,
    @Body() carData: CarCreateDto, @Request() req
  ) {
    console.log(filesData)
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
