import { ClientSession } from 'mongoose';
import { User } from '../user.entity';

export interface UserRepositoryI {
  findAll(
    page: number,
    limit: number
  ): Promise<{ users: User[]; totalRecords: number }>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  incrementPostCount(
    id: string,
    action: 'increment' | 'decrement',
    session: ClientSession
  ): Promise<unknown>;
  create(
    name: string,
    email: string,
    password: string,
    avatar?: string
  ): Promise<User>;
  update(
    id: string,
    name?: string,
    email?: string,
    avatar?: string
  ): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
