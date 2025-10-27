import { Product } from 'generated/prisma';

export type CreateProductDTO = Pick<Product, 'name' | 'description'> & {
  price: number;
};

export type UpdateProductDTO = Partial<CreateProductDTO>;
