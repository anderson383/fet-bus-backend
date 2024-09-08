import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES } from 'src/constants/roles';

@Injectable()
export class StudentGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isAdmin = user.rol === ROLES.ADMIN;

    const isStudent = user.rol === ROLES.STUDENT

    return isStudent
  }
}
