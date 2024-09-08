import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CarController } from "./controllers/car.controller";
import { CarService } from "./services/car.service";


@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService , PrismaService],
  exports: [],
})
export class ConfigModule {}
