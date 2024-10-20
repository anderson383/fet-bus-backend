import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PaymentController } from './controllers/payment.controller';
import { TransactionService } from './services/transaction.service';
import { PlansService } from '../plans/services/plans.service';
import { MembershipService } from './services/menbership.service';

@Module({
  controllers: [PaymentController],
  providers: [TransactionService, PrismaService, PlansService, MembershipService],
})
export class PaymentsModule {}
