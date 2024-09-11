import { Module } from '@nestjs/common';
import { BusDriverController } from './controllers/bus-driver.controller';
import { BusDriverService } from './services/bus-driver.service';
import { PrismaService } from '../prisma/prisma.service';
import { CarService } from '../config/services/car.service';
import { CarRouteService } from '../car-route/services/car-route.service';

@Module({
  controllers: [BusDriverController],
  providers: [BusDriverService, PrismaService, CarService, CarRouteService]
})
export class BusDriverModule {}
