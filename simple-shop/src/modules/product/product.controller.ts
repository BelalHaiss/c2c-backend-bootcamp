import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Req,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { ProductService } from './product.service';
import type {
  CreateProductDTO,
  ProductResponseDTO,
  UpdateProductDTO,
} from './types/product.dto';
import type { ProductQuery } from './types/product.types';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  productSchema,
  productValidationSchema,
  updateProductValidationSchema,
} from './util/proudct.validation.schema';
import { Roles } from 'src/decorators/roles.decorator';
import { ImageKitExceptionFilter } from 'src/exceptions/exception';
import { FileCleanupInterceptor } from '../file/cleanup-file.interceptor';

@Controller('product')
@Roles(['MERCHANT'])
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'), FileCleanupInterceptor)
  @UseFilters(ImageKitExceptionFilter)
  create(
    @Body(new ZodValidationPipe(productValidationSchema))
    createProductDto: CreateProductDTO,
    @Req() request: Express.Request,
    @UploadedFile()
    file?: Express.Multer.File,
  ): Promise<ProductResponseDTO> {
    return this.productService.create(createProductDto, request.user, file);
  }

  @Roles(['MERCHANT', 'CUSTOMER'])
  @Get()
  findAll(@Query(new ZodValidationPipe(productSchema)) query: ProductQuery) {
    return this.productService.findAll(query);
  }

  @Roles(['MERCHANT', 'CUSTOMER'])
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'), FileCleanupInterceptor)
  @UseFilters(ImageKitExceptionFilter)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateProductValidationSchema))
    updatePayload: UpdateProductDTO,
    @Req()
    request: Express.Request,
    @UploadedFile()
    file?: Express.Multer.File,
  ): Promise<ProductResponseDTO> {
    return this.productService.update(id, updatePayload, request.user, file);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Express.Request,
  ) {
    return this.productService.remove(id, request.user);
  }
}
