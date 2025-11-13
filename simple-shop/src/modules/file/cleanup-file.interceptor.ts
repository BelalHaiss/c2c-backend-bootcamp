import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError } from 'rxjs';
import { FileService } from './file.service';

@Injectable()
export class FileCleanupInterceptor implements NestInterceptor {
  constructor(private fileService: FileService) {}
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest<Express.Request>();
    const file = req.file;

    return next.handle().pipe(
      catchError(async (err) => {
        if (file) await this.fileService.deleteFileFromImageKit(file.fileId!); // cleanup here
        throw err; // exception filter will handle it
      }),
    );
  }
}
