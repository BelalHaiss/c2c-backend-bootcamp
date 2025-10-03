import { Prisma } from '../../generated/prisma';
import { prisma } from '../../services/prisma.service';
import { UserRepositoryI } from './interfaces/user-repo-interface';
import { User } from './user.entity';

export class UserRepository implements UserRepositoryI {
  private prismaUser = prisma.user;

  findAll(page = 1, limit = 10): Promise<User[]> {
    return this.prismaUser.findMany({
      skip: (page - 1) * limit,
      take: limit
    });
  }

  findById(id: number) {
    return this.prismaUser.findUniqueOrThrow({
      where: { id }
    });
  }

  findByEmail(email: string) {
    return this.prismaUser.findUnique({
      where: { email }
    });
  }

  create(name: string, email: string, password: string, avatar?: string) {
    const user: Omit<User, 'id'> = {
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
      password,
      avatar: avatar || null
    };

    return this.prismaUser.create({ data: user });
  }

  update(id: number, name?: string, email?: string, avatar?: string) {
    return this.prismaUser.update({
      where: { id },
      data: { name: name, email, avatar }
    });
  }

  async delete(id: number) {
    const deletedUser = await this.prismaUser.delete({ where: { id } });
    return Boolean(deletedUser);
  }
}
