import {
  Injectable
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) {}

  getByEmail (email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email
      }
    })
  }
}
