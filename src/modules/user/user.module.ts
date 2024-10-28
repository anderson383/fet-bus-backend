import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserController } from "./controllers/user.controller";


@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
