import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PlansService } from '../services/plans.service';
import { CreatePlanDto } from '../dto/create-plan.dto';
import { UpdatePlanDto } from '../dto/update-plan.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AdminGuard } from 'src/modules/auth/guards/admin.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('plans')
@ApiTags('Controlador de planes')
@UseGuards(AuthGuard, AdminGuard)
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo plan.',
  })
  create(@Body() createPlanDto: CreatePlanDto, @Req() req) {
    this.plansService.userId = req.user.id;
    return this.plansService.create(createPlanDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los planes.',
  })
  findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un plan por su id.',
  })
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un plan por su id.',
  })
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto, @Req() req) {
    this.plansService.userId = req.user.id;
    return this.plansService.update(id, updatePlanDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un plan por su id.',
  })
  remove(@Param('id') id: string, @Req() req) {
    this.plansService.userId = req.user.id;
    return this.plansService.remove(id);
  }
}
