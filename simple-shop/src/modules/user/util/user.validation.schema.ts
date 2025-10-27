import { RegisterDTO } from 'src/modules/auth/dto/auth.dto';
import z, { ZodType } from 'zod';
import { UpdateUserDTO } from '../dto/user.dto';

// base schema
export const userValidationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email().toLowerCase(),
  password: z.string().min(6).max(100),
  role: z.enum(['MERCHANT', 'CUSTOMER']),
}) satisfies ZodType<RegisterDTO>;

export const updateUserValidationSchema = userValidationSchema
  .pick({ name: true, email: true })
  .partial() satisfies ZodType<UpdateUserDTO>;
