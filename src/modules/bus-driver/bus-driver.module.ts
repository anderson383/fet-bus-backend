import { Module } from '@nestjs/common';
import { BusDriverController } from './controllers/bus-driver.controller';
import { BusDriverService } from './services/bus-driver.service';
import { PrismaService } from '../prisma/prisma.service';
import { CarService } from '../config/services/car.service';
import { CarRouteService } from '../car-route/services/car-route.service';
import { DriversController } from './controllers/drivers.controller';
import { UserService } from '../user/services/user.service';

@Module({
  controllers: [BusDriverController, DriversController],
  providers: [BusDriverService, PrismaService, CarService, CarRouteService, UserService],
})
export class BusDriverModule {}
