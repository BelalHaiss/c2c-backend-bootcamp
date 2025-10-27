import { User } from 'generated/prisma';

export type RegisterDTO = Omit<User, 'id' | 'createdAt' | 'isDeleted'>;

export type UserResponseDTO = {
  token: string;
  user: Omit<User, 'password' | 'id'> & { id: string };
};

export type LoginDTO = {
  email: string;
  password: string;
};
