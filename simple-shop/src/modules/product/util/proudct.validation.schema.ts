import z, { ZodType } from 'zod';
import { CreateProductDTO } from '../types/product.dto';

export const productValidationSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().min(2).max(255),
  price: z.number().min(0),
}) satisfies ZodType<CreateProductDTO>;

export const updateProductValidationSchema =
  productValidationSchema.partial() satisfies ZodType<
    Partial<CreateProductDTO>
  >;
