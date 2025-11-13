import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptors/loggin.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import {
  HttpExceptionFilter,
  PrismaExceptionFilter,
  UncaughtExceptionFilter,
  ZodExceptionFilter,
} from './exceptions/exception';

BigInt.prototype.toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );

  app.useGlobalFilters(
    new UncaughtExceptionFilter(),
    new HttpExceptionFilter(),
    new ZodExceptionFilter(),
    new PrismaExceptionFilter(),
  );

  console.log(process.env.NODE_ENV, 'NODE_ENV');
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
