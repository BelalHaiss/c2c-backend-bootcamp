import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult, UnifiedApiResponse } from 'src/types/util.types';

@Injectable()
export class ResponseInterceptor<T extends Record<string, unknown>>
  implements NestInterceptor<T, UnifiedApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<UnifiedApiResponse<T>> {
    return next.handle().pipe(
      map((data: PaginatedResult<T> | T) => {
        // we find that we already have data && meta
        if (isPaginationResponse<T>(data)) {
          return {
            success: true,
            ...data,
          };
        }
        // we don`t have data
        return { success: true, data };
      }),
    );
  }
}

export const isPaginationResponse = <T>(
  data: Record<string, unknown>,
): data is PaginatedResult<T> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data && typeof data === 'object' && 'data' in data && 'meta' in data;
};
