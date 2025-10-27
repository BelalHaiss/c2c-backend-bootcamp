import { Reflector } from '@nestjs/core';

export const IsPublic = Reflector.createDecorator<boolean>();
