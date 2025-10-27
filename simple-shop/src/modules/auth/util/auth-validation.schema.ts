import { userValidationSchema } from 'src/modules/user/util/user.validation.schema';
import { ZodType } from 'zod';
import { LoginDTO } from '../dto/auth.dto';

// register = base schema
export const registerValidationSchema = userValidationSchema;

// login = pick email and password from base schema
export const loginValidationSchema = userValidationSchema.pick({
  email: true,
  password: true,
}) satisfies ZodType<LoginDTO>;
