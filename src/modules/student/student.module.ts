import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService,PrismaService],
})
export class StudentModule {}
