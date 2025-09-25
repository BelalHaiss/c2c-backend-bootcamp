import z, { ZodType } from 'zod';
import { User } from '../user.entity';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  avatar: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  password: z.string().min(8) // hash value
}) satisfies ZodType<User>;
