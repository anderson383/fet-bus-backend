import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CommonModule } from './modules/common/common.module';
import { ConfigModule } from './modules/config/config.module';
import { CarRouteModule } from './modules/car-route/car-route.module';
import { BusDriverModule } from './modules/bus-driver/bus-driver.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CommonModule,
    ConfigModule,
    CarRouteModule,
    BusDriverModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
