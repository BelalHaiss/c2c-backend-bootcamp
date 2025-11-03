import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { PaginationQueryType } from 'src/types/util.types';
import type { UpdateUserDTO } from './dto/user.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { updateUserValidationSchema } from './util/user.validation.schema';
import { paginationSchema } from 'src/utils/api.util';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(
    @Query(new ZodValidationPipe(paginationSchema))
    query: PaginationQueryType,
  ) {
    return this.userService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: bigint) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: bigint,
    @Body(new ZodValidationPipe(updateUserValidationSchema))
    userUpdatePayload: UpdateUserDTO,
  ) {
    return this.userService.update(id, userUpdatePayload);
  }

  @Delete(':id')
  async remove(@Param('id') id: bigint) {
    const removedUser = await this.userService.remove(id);
    return Boolean(removedUser);
  }
}
