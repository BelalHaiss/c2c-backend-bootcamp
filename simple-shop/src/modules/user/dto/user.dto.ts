import { User } from 'generated/prisma';

export type UpdateUserDTO = Partial<Pick<User, 'name' | 'email'>>;
