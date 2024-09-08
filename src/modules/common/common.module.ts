import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CommonController } from "./controllers/common.controller";
import { ProgramAcademicService } from "./services/program-academic.service";
import { CommonService } from "./services/common.service";


@Module({
  imports: [],
  controllers: [CommonController],
  providers: [ProgramAcademicService, CommonService, PrismaService],
  exports: [],
})
export class CommonModule {}
