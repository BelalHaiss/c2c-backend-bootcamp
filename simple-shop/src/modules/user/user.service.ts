import { Injectable } from '@nestjs/common';
import { RegisterDTO, UserResponseDTO } from '../auth/dto/auth.dto';
import { DatabaseService } from '../database/database.service';
import { User } from 'generated/prisma';
import { removeFields } from 'src/utils/object.util';
import { PaginatedResult, PaginationQueryType } from 'src/types/util.types';
import { UpdateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: DatabaseService) {}
  create(registerDTO: RegisterDTO) {
    return this.prismaService.user.create({
      data: registerDTO,
    });
  }

  findAll(
    query: Required<PaginationQueryType>,
  ): Promise<PaginatedResult<Omit<User, 'password'>>> {
    return this.prismaService.$transaction(async (prisma) => {
      const users = await prisma.user.findMany({
        skip: (query.page - 1) * query.limit,
        take: query.limit,
        omit: {
          password: true,
        },
      });
      const count = await prisma.user.count();
      return {
        data: users,
        meta: {
          total: count,
          page: query.page,
          limit: query.limit,
          totalPages: Math.ceil(count / query.limit),
        },
      };
    });
  }
  findByEmailOrThrow(email: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: { email },
    });
  }

  findOne(id: bigint) {
    return this.prismaService.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  update(id: bigint, userUpdatePayload: UpdateUserDTO) {
    return this.prismaService.user.update({
      where: { id },
      data: userUpdatePayload,
      omit: { password: true },
    });
  }

  remove(id: bigint) {
    return this.prismaService.user.update({
      where: { id },
      data: { isDeleted: true },
    });
  }

  mapUserWithoutPasswordAndCastBigint(user: User): UserResponseDTO['user'] {
    const userWithoutPassword = removeFields(user, ['password']);
    return {
      ...userWithoutPassword,
      id: String(userWithoutPassword.id),
    };
  }
}
