import z, { ZodType } from 'zod';
import { CreateOrderDTO } from '../types/order.dto';

export const createOrderDTOValidationSchema = z.array(
  z.object({
    productId: z.number().min(1),
    qty: z.number().min(1),
  }),
) satisfies ZodType<CreateOrderDTO>;
