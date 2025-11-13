import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // before route handler
    console.log('Before...');

    const now = Date.now();
    // invoke route handler
    return next.handle().pipe(
      tap(() => {
        // save in variable
        // if takes more than 2 seconds  // alert
        console.log(`After... ${Date.now() - now}ms`);
      }),
    );
  }
}

// readable stream --> writeable stream

// busboy file ->writeable stream (file.png)
