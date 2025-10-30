import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ProductQuery } from './types/product.types';
import { Prisma } from 'generated/prisma';
import type { CreateProductDTO, UpdateProductDTO } from './types/product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaService: DatabaseService) {}
  create(
    createProductDto: CreateProductDTO,
    file: Express.Multer.File,
    user: Express.Request['user'],
  ) {
    return this.prismaService.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        merchantId: Number(user!.id),
        Asset: {
          create: {
            fileId: file.fileId!,
            fileSizeInKB: Math.floor(file.size / 1024),
            url: file.url!,
            ownerId: Number(user!.id),
            fileType: file.mimetype,
          },
        },
      },
    });
  }

  findAll(query: Required<Omit<ProductQuery, 'name'>> & { name?: string }) {
    return this.prismaService.$transaction(async (prisma) => {
      const whereClause: Prisma.ProductWhereInput = query.name
        ? { name: { contains: query.name } }
        : {};
      const proucts = await prisma.product.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        where: whereClause,
      });
      const count = await prisma.product.count({
        where: whereClause,
      });
      return {
        data: proucts,
        meta: {
          total: count,
          page: query.page,
          limit: query.limit,
          totalPages: Math.ceil(count / query.limit),
        },
      };
    });
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  update(
    id: number,
    updateProductDto: UpdateProductDTO,
    user: Express.Request['user'],
    file?: Express.Multer.File,
  ) {
    // update fileId in db if exist in payload
    // remove old asset record // soft delete
    // remove file from imagekit
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
