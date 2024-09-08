import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CommonService {
  constructor(
    private prisma: PrismaService,
  ) {}

  getListItemForCodesParents (codes: string[]) {
    return this.prisma.listType.findMany({
      where: {
        code: {
          in: codes
        },
      },
      include: {
        listItem: true
      }
    })
  }
}
