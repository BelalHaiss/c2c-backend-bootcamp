import z, { ZodType } from 'zod';
import { CreateOrderDTO, CreateOrderReturnDTO } from '../types/order.dto';

export const createOrderDTOValidationSchema = z.array(
  z.object({
    productId: z.number().min(1),
    qty: z.number().min(1),
  }),
) satisfies ZodType<CreateOrderDTO>;

export const createReturnDTOValidationSchema = z.object({
  orderId: z.number().min(1),
  items: z.array(
    z.object({
      productId: z.number().min(1),
      qty: z.number().min(1),
    }),
  ),
}) satisfies ZodType<CreateOrderReturnDTO>;
