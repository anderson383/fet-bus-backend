import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CommonController } from "./controllers/common.controller";
import { ProgramAcademicService } from "./services/program-academic.service";
import { CommonService } from "./services/common.service";
import { S3Service } from "./services/aws-s3.service";


@Module({
  imports: [],
  controllers: [CommonController],
  providers: [ProgramAcademicService, CommonService, PrismaService, S3Service],
  exports: [S3Service],
})
export class CommonModule {}
