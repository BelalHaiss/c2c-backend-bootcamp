import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { ProductModule } from './modules/product/product.module';
import { FileModule } from './modules/file/file.module';
import { OrderModule } from './modules/order/order.module';
import path from 'path';
import { ThrottlerModule } from '@nestjs/throttler';
import { RateLimitTestModule } from './modules/rate-limit-test/rate-limit-test.module';
import { ThrottlerBehindProxyGuard } from './modules/rate-limit-test/guard';

const envFilePath = path.join(
  __dirname,
  `../.env.${process.env.NODE_ENV === 'development' ? 'dev' : 'prod'}`,
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),

    AuthModule,
    UserModule,
    DatabaseModule,
    ProductModule,
    FileModule,
    OrderModule,
    RateLimitTestModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
    { provide: APP_GUARD, useClass: ThrottlerBehindProxyGuard },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
