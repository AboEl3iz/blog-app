import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // If no roles are defined, allow access
    }
    
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user is attached to the request object

    if (!user || !user.roles) {
      return false; // If no user or roles, deny access
    }

    // Check if the user's roles include any of the required roles
    return roles.some(role => user.roles.includes(role));
  }
}
