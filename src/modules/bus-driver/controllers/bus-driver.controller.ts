import { BadRequestException, Body, Controller, Delete, Get, Param, ParseFilePipe, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { BusDriverService } from '../services/bus-driver.service';
import { BusDriverCreateDto, BusDriverUpdateDto } from '../dtos/bus-driver.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { IMulterFile } from 'src/types/multer';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FileTypeValidator } from 'src/constants/validators/file-validator';

export interface FilesDataBusDriver {
    license: IMulterFile[]
}

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
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'license', maxCount: 1 }
        ])
    )
    @ApiOperation({
        summary: 'Crear un nuevo conductor de autobús.',
    })
    createBusDriver(
        @UploadedFiles(
            new ParseFilePipe({
                fileIsRequired: true,
                validators: [
                    new FileTypeValidator({ multiple: true, filetype: 'application/pdf' })
                ]
            })
        )
        files: FilesDataBusDriver,
        @Body() data: BusDriverCreateDto,
        @Req() req
    ) {
        if (!files.license || files.license.length === 0) {
            throw new BadRequestException('El archivo "licencia" es obligatorio.');
        }
        this.busDriverService.userId = req.user.id;
        return this.busDriverService.create(data, files);
    }

    @Put(':id')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'license', maxCount: 1 }
        ])
    )
    @ApiOperation({
        summary: 'Actualizar un conductor de autobús por su id.',
    })
    updateBusDriver(
        @UploadedFiles(
            new ParseFilePipe({
                fileIsRequired: true,
                validators: [
                    new FileTypeValidator({ multiple: true, filetype: 'application/pdf' }),
                ]
            })
        )
        files: FilesDataBusDriver,
        @Param('id') id: string,
        @Body() data: BusDriverUpdateDto,
        @Req() req
    ) {
        this.busDriverService.userId = req.user.id;
        return this.busDriverService.update(id, data, files);
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
