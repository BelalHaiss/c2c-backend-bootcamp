import z, { ZodType } from 'zod';
import { CreateProductDTO } from '../types/product.dto';
import { paginationSchema } from 'src/utils/api.util';
import { ProductQuery } from '../types/product.types';

export const productValidationSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().min(2).max(255),
  price: z.coerce.number().min(0),
}) satisfies ZodType<CreateProductDTO>;

export const updateProductValidationSchema =
  productValidationSchema.partial() satisfies ZodType<
    Partial<CreateProductDTO>
  >;

export const productSchema = paginationSchema.extend({
  name: z.string().min(2).max(255).optional(),
}) satisfies ZodType<ProductQuery>;
