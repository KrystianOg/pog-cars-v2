import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permissions, type Permission } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    let permissions = this.reflector.get(Permissions, context.getHandler());

    if (!Array.isArray(permissions)) {
      permissions = [permissions];
    }

    if (!permissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.matchPermissions(permissions, user);
  }

  private matchPermissions(permissions: Permission[], userId: number): boolean {
    return true;
  }
}
