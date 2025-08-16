import { User } from '../../user/user.entity';

export type LoginDTO = {
  email: string;
  password: string;
};

export type LoginResponseDTO = Omit<User, 'password'>;

export type RegisterDTO = Pick<User, 'avatar' | 'email' | 'name' | 'password'>;
export type RegisterResponseDTO = Omit<User, 'password'>;
