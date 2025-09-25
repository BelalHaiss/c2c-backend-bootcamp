import { Prisma } from '../../generated/prisma';
import { prisma } from '../../services/prisma.service';
import { User } from './user.entity';

export class UserRepository {
  private prismaUser = prisma.user;

  findAll(query: Prisma.UserFindManyArgs['where']): Promise<User[]> {
    return this.prismaUser.findMany({
      where: query
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

  delete(id: number) {
    return this.prismaUser.delete({ where: { id } });
  }
}
