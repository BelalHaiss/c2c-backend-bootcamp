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
    AuthModule,
    UserModule,
    DatabaseModule,
    ProductModule,
    FileModule,
    OrderModule,
  ],
  providers: [
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
