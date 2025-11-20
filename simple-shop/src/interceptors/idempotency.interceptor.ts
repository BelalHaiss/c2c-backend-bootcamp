import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { DatabaseService } from 'src/modules/database/database.service';
import { Request } from 'express';
import { Prisma } from 'generated/prisma';

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(private prismaService: DatabaseService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<SafeObject>> {
    // create idempotency
    // read idempotency header
    const request = context.switchToHttp().getRequest<Request>();
    const idempotencyKey = request.headers['idempotency-key'];
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key header is required');
    }

    // create record
    try {
      await this.prismaService.idempotency.create({
        data: {
          idempotencyKey: idempotencyKey as string,
          idempotencyStatus: 'IN_PROGRESS',
          expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 mins
        },
      });
      return next.handle().pipe(
        mergeMap(async (responseData: SafeObject) => {
          await this.prismaService.idempotency.update({
            where: { idempotencyKey: idempotencyKey as string },
            data: {
              idempotencyStatus: 'COMPLETED',
              response: responseData as Prisma.InputJsonValue,
            },
          });
          return responseData;
        }),

        catchError(async (err) => {
          await this.prismaService.idempotency.update({
            where: { idempotencyKey: idempotencyKey as string },
            data: {
              idempotencyStatus: 'FAILED',
              response: Prisma.JsonNull,
            },
          });
          throw err;
        }),
      );
    } catch (error: unknown) {
      // record exist
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' // duplicated
      ) {
        const existingRecord =
          await this.prismaService.idempotency.findUniqueOrThrow({
            where: { idempotencyKey: idempotencyKey as string },
          });

        // check status
        switch (existingRecord.idempotencyStatus) {
          case 'IN_PROGRESS':
            throw new ConflictException(
              'Request with this Idempotency-Key is already in progress',
            );
          case 'COMPLETED':
            return of(existingRecord.response as SafeObject);
          case 'FAILED':
            return next.handle().pipe(
              mergeMap(async (responseData: SafeObject) => {
                await this.prismaService.idempotency.update({
                  where: { idempotencyKey: idempotencyKey as string },
                  data: {
                    idempotencyStatus: 'COMPLETED',
                    response: responseData as Prisma.InputJsonValue,
                  },
                });
                return responseData;
              }),

              catchError(async (err) => {
                await this.prismaService.idempotency.update({
                  where: { idempotencyKey: idempotencyKey as string },
                  data: {
                    idempotencyStatus: 'FAILED',
                    response: Prisma.JsonNull,
                  },
                });
                throw err;
              }),
            );
        }
      }
      throw error;
    }
  }
}

type SafeObject = Record<string, unknown>;
