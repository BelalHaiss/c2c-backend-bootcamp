import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { StringObject } from '../../utils/util.types';
import { RegisterDTO, RegisterResponseDTO } from './types/auth.dto';
import { CustomError } from '../../utils/exception';

export class AuthController {
  private authService = new AuthService();

  public async register(
    req: Request<StringObject, StringObject, RegisterDTO>,
    res: Response<RegisterResponseDTO>
  ) {
    try {
      // TODO create utility method to validate zod schema
      const user = await this.authService.register(req.body);
      res.json(user);
    } catch (error) {
      throw new CustomError('sometheng went wrong', 'AUTH', 400);
    }
  }
  public login(req: Request, res: Response) {}
  public logout(req: Request, res: Response) {}
}

export const authController = new AuthController();
