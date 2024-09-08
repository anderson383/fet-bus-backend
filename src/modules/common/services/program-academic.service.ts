import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ProgramAcademicService {
  constructor(
    private prisma: PrismaService,
  ) {}

  getProgramsAcademics () {
    return this.prisma.academicProgram.findMany()
  }
}
