import { Module } from '@nestjs/common';
import { CarRouteController } from './controllers/car-route.controller';
import { CarRouteService } from './services/car-route.service';
import { PrismaService } from '../prisma/prisma.service';


@Module({
  controllers: [CarRouteController],
  providers: [CarRouteService, PrismaService],

})
export class CarRouteModule {}
