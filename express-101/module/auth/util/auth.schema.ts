import { ZodType } from 'zod';
import { userSchema } from '../../user/util/user.schema';
import { RegisterDTO } from '../types/auth.dto';

export const registerDTOSchema = userSchema.pick({
  avatar: true,
  email: true,
  name: true,
  password: true
}) satisfies ZodType<RegisterDTO>;
