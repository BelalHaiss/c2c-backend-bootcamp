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
import type { CreateProductDTO, UpdateProductDTO } from './types/product.dto';
import type { ProductQuery } from './types/product.types';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { productValidationSchema } from './util/proudct.validation.schema';
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
    @UploadedFile()
    file: Express.Multer.File,
    @Req() request: Express.Request,
  ) {
    return this.productService.create(createProductDto, file, request.user);
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
    @Body(new ZodValidationPipe(productValidationSchema))
    updatePayload: UpdateProductDTO,
    @Req()
    request: Express.Request,
    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return this.productService.update(id, updatePayload, request.user, file);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
