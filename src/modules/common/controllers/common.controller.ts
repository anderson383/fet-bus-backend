import { Body, Controller, Get, ParseArrayPipe, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProgramAcademicService } from '../services/program-academic.service';
import { CommonService } from '../services/common.service';

@Controller('common')
@ApiTags('Controlador de la autenticación')
export class CommonController {
  constructor(
    private readonly programAcademic: ProgramAcademicService,
    private readonly commonService: CommonService
  ) {}

  @Get('programs')
  @ApiOperation({
    summary: 'Obtiene los programas academicos',
  })
  async getProgramsAcademics(){
    return this.programAcademic.getProgramsAcademics();
  }


  @ApiOperation({
    summary: 'Trae listas genericas de la base de datos',
  })
  @ApiResponse({
    status: 201,
    description:
      'Exito. Devuelve un array de listas de elementos padres con sus hijos',
  })
  @Get('list-types')
  async getListItemForParent(
    @Query('codes', ParseArrayPipe) codes: string[],
  ): Promise<any> {
    return this.commonService.getListItemForCodesParents(codes);
  }
}
