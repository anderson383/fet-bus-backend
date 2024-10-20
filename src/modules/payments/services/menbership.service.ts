import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class MembershipService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async updateExpiredPlans() {
    const today = new Date();
    await this.prisma.userPlan.updateMany({
      where: {
        date_end: { lt: today },
        status_plan: true,
      },
      data: {
        status_plan: false,
      },
    });
  }
}
