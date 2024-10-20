import { Module } from '@nestjs/common';
import { StudentController } from './controllers/student.controller';
import { StudentService } from './services/student.service';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  controllers: [StudentController],
  providers: [StudentService,PrismaService, EventsGateway],
})
export class StudentModule {}
