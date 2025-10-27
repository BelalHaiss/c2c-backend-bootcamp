import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JSON_Web_Token_Payload } from '../types/user-auth.type';
import { DatabaseService } from 'src/modules/database/database.service';
import { removeFields } from 'src/utils/object.util';
import { Reflector } from '@nestjs/core';
import { IsPublic } from 'src/decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prismaService: DatabaseService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    // route public
    // return true
    const isPublic = this.reflector.getAllAndOverride<boolean>(IsPublic, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    // authorization header
    const authHeader = request.headers.authorization;
    const jwt = authHeader?.split(' ')[1];
    if (!jwt) {
      throw new UnauthorizedException();
    }
    try {
      // validate jwt
      const payload = this.jwtService.verify<JSON_Web_Token_Payload>(jwt);

      // get user from db
      const user = await this.prismaService.user.findUniqueOrThrow({
        where: { id: BigInt(payload.sub) },
      });
      // attach user to request
      request.user = {
        ...removeFields(user, ['password']),
        id: String(user.id),
      };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
