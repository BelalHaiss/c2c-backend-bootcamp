import { Request, Response } from 'express';
import { StringObject } from '../../utils/util.types';
import {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO
} from './types/auth.dto';
import { createArgonHash, verifyArgonHash } from './util/argon.util';
import { removeFields } from '../../utils/object.util';
import { userService } from '../user/user.service';

export class AuthService {
  private _userService = userService;

  public async register(payload: RegisterDTO): Promise<RegisterResponseDTO> {
    // hash password
    const hashedValue = await createArgonHash(payload.password);
    // save user data in db
    const userData = this._userService.createUser(
      payload.name,
      payload.email,
      hashedValue,
      payload.avatar
    );

    return removeFields(userData, ['password']);
  }
  public async login(payload: LoginDTO): Promise<LoginResponseDTO | null> {
    // find email
    const foundUser = this._userService.findByEmail(payload.email);
    // if no email => return error
    if (!foundUser) return null;

    const isPasswordMatch = await verifyArgonHash(
      payload.password,
      foundUser.password
    );
    // match payload password with hashed password
    if (!isPasswordMatch) return null;

    return removeFields(foundUser, ['password']);
  }
  public logout(req: Request, res: Response) {}
}
