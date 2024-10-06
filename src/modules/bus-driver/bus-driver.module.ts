import { Module } from '@nestjs/common';
import { BusDriverController } from './controllers/bus-driver.controller';
import { BusDriverService } from './services/bus-driver.service';
import { PrismaService } from '../prisma/prisma.service';
import { CarService } from '../config/services/car.service';
import { CarRouteService } from '../car-route/services/car-route.service';
import { DriversController } from './controllers/drivers.controller';
import { UserService } from '../user/services/user.service';
import { BusDriverManagerService } from './services/bus-driver-manager.service';
import { BusDriverManagerController } from './controllers/bus-driver-manager.controller';
import { S3Service } from '../common/services/aws-s3.service';

@Module({
  controllers: [BusDriverController, DriversController, BusDriverManagerController],
  providers: [BusDriverService, PrismaService, CarService, CarRouteService, UserService, BusDriverManagerService, S3Service],
})
export class BusDriverModule {}
