import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class StudentGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      // Si la ruta está marcada como pública, no aplicar el guard
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isAdmin = user.rol === ROLES.ADMIN;

    const isStudent = user.rol === ROLES.STUDENT

    return isStudent
  }
}
