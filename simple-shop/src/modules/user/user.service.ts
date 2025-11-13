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
    query: PaginationQueryType,
  ): Promise<PaginatedResult<Omit<User, 'password'>>> {
    return this.prismaService.$transaction(async (prisma) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const users = await prisma.user.findMany({
        ...removeFields(pagination, ['page']),
        omit: {
          password: true,
        },
      });
      const count = await prisma.user.count();
      return {
        data: users,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }
  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
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
