import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './modules/common/common.module';
import { ConfigModule as ConfigAppCustom } from './modules/config/config.module';
import { CarRouteModule } from './modules/car-route/car-route.module';
import { BusDriverModule } from './modules/bus-driver/bus-driver.module';
import { PlansModule } from './modules/plans/plans.module';
import { StudentModule } from './modules/student/student.module';
import { ConfigModule } from '@nestjs/config';
import { EventsGateway } from './events/events.gateway';
import * as Joi from 'joi';
import { EventsModule } from './events/events.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AWS_ACCESS_KEY:Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
      })
    }),
    AuthModule,
    UserModule,
    CommonModule,
    ConfigAppCustom,
    CarRouteModule,
    BusDriverModule,
    PlansModule,
    StudentModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, EventsGateway],
})
export class AppModule {}
