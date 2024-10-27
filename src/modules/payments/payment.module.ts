import { Module } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PaymentController } from './controllers/payment.controller';
import { TransactionService } from './services/transaction.service';
import { PlansService } from '../plans/services/plans.service';
import { MembershipService } from './services/menbership.service';
import { EventsGateway } from 'src/events/events.gateway';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../user/services/user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PaymentController],
  providers: [TransactionService, PrismaService, PlansService, MembershipService, EventsGateway],
})
export class PaymentsModule {}
