import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class DriverBusGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isAdmin = user.rol === ROLES.ADMIN;

    const isDriverBus = user.rol === ROLES.DRIVER_BUS
    return isDriverBus
  }
}
