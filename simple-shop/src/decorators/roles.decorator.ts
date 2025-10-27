import { Reflector } from '@nestjs/core';
import { UserRole } from 'generated/prisma';

export const Roles = Reflector.createDecorator<UserRole[]>();
