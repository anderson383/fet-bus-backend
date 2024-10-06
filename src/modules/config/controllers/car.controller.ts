
import { BadRequestException, Body, Controller, Delete, Get, Param, ParseFilePipe, Post, Put, Request, UploadedFile, UploadedFiles, UseGuards, UseInterceptors,  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarService } from '../services/car.service';
import { CarCreateDto, CarUpdateDto } from '../dtos/car.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { IMulterFile } from 'src/types/multer';
import { FileTypeValidator } from 'src/constants/validators/file-validator';

export interface FilesDataCar {
  tarjeta_de_propietario: IMulterFile[]
  seguro: IMulterFile[]
  seguro_todo_riesgo: IMulterFile[]
  tecnomecanica: IMulterFile[]
}

@Controller('config/car')
@ApiTags('Controlador de configuracion de carros')
@UseGuards(AuthGuard, AdminGuard)
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'tarjeta_de_propietario', maxCount: 1 },
      { name: 'seguro', maxCount: 1 },
      { name: 'seguro_todo_riesgo', maxCount: 1 },
      { name: 'tecnomecanica', maxCount: 1 },
    ])
  )
  async create(
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new FileTypeValidator({ multiple: true, filetype:  'application/pdf' }),
        ]
      }),
    )
      files: FilesDataCar,
    @Body() carData: CarCreateDto, @Request() req
  ) {
    if (!files.tarjeta_de_propietario || files.tarjeta_de_propietario.length === 0) {
      throw new BadRequestException('El archivo "tarjeta de propietario" es obligatorio.');
    }
    if (!files.seguro || files.seguro.length === 0) {
      throw new BadRequestException('El archivo "seguro" es obligatorio.');
    }
    if (!files.seguro_todo_riesgo || files.seguro_todo_riesgo.length === 0) {
      throw new BadRequestException('El archivo "seguro todo riesgo" es obligatorio.');
    }

    if (!files.tecnomecanica || files.tecnomecanica.length === 0) {
      throw new BadRequestException('El archivo "tecnomecánica" es obligatorio.');
    }
    this.carService.userId = req.user.id
    return this.carService.createCar(carData, files);
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'tarjeta_de_propietario', maxCount: 1 },
      { name: 'seguro', maxCount: 1 },
      { name: 'seguro_todo_riesgo', maxCount: 1 },
      { name: 'tecnomecanica', maxCount: 1 },
    ])
  )
  async editCar(
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new FileTypeValidator({ multiple: true, filetype:  'application/pdf' }),
        ]
      }),
    )
      files: FilesDataCar,
    @Body() carData: CarUpdateDto,
    @Param('id') id,
    @Request() req
  ){
    console.log('entre')
    this.carService.userId = req.user.id
    return this.carService.editCardForId(carData, id, files);
  }


  @Delete(':id')
  async deleteCar(@Param('id') id, @Request() req){
    this.carService.userId = req.user.id
    return this.carService.deleteCarForId(id);
  }
}
