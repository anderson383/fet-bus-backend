import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CarController } from "./controllers/car.controller";
import { CarService } from "./services/car.service";
import { S3Service } from "../common/services/aws-s3.service";


@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService , PrismaService, S3Service],
  exports: [],
})
export class ConfigModule {}