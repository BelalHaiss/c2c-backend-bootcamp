import { Prisma, Product } from 'generated/prisma';

export type CreateProductDTO = Pick<Product, 'name' | 'description'> & {
  price: number;
};

export type UpdateProductDTO = Partial<CreateProductDTO>;

export type ProductResponseDTO = Prisma.ProductGetPayload<{
  include: {
    Asset: true;
  };
}>;
