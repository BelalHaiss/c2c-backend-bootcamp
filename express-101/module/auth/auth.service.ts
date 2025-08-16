import { Request, Response } from 'express';
import { StringObject } from '../../utils/util.types';
import { RegisterDTO, RegisterResponseDTO } from './types/auth.dto';
import { UserService } from '../user/user.service';
import { createArgonHash } from './util/argon.util';
import { removeFields } from '../../utils/object.util';

export class AuthService {
  private userService = new UserService();

  public async register(payload: RegisterDTO): Promise<RegisterResponseDTO> {
    // hash password
    const hashedValue = await createArgonHash(payload.password);
    // save user data in db
    const userData = this.userService.createUser(
      payload.name,
      payload.email,
      payload.password,
      payload.avatar
    );

    return removeFields(userData, ['password']);
  }
  public login(req: Request, res: Response) {}
  public logout(req: Request, res: Response) {}
}
