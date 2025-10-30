import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { FileModule } from '../file/file.module';

@Module({
  imports: [FileModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
