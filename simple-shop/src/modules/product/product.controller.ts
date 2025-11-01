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
  productValidationSchema,
  updateProductValidationSchema,
} from './util/proudct.validation.schema';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('product')
@Roles(['MERCHANT'])
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
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
  findAll(@Query() query: ProductQuery) {
    return this.productService.findAll({
      limit: Number(query.limit),
      page: Number(query.page),
      name: query.name,
    });
  }

  @Roles(['MERCHANT', 'CUSTOMER'])
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
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
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
