import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { HttpErrorStatus, StringObject } from '../../utils/util.types';
import {
  LoginDTO,
  LoginResponseDTO,
  RegisterDTO,
  RegisterResponseDTO
} from './types/auth.dto';
import { zodValidation } from '../../utils/zod.util';
import { loginDTOSchema, registerDTOSchema } from './util/auth.schema';
import { deleteUploadedAsset } from '../../utils/assets.util';

export class AuthController {
  private authService = new AuthService();

  public async register(
    req: Request<StringObject, StringObject, RegisterDTO>,
    res: Response<RegisterResponseDTO | string>,
    next: NextFunction
  ) {
    try {
      const payloadData = zodValidation(registerDTOSchema, req.body, 'AUTH');
      const user = await this.authService.register(payloadData);
      res.json(user);
    } catch (error) {
      if (req.file) {
        await deleteUploadedAsset(req.file?.filename!);
      }
      res
        .status(HttpErrorStatus.InternalServerError)
        .send('internal server error');
    }
  }
  public async login(
    req: Request<StringObject, StringObject, LoginDTO>,
    res: Response<LoginResponseDTO | string>,
    next: NextFunction
  ) {
    const payloadData = zodValidation(loginDTOSchema, req.body, 'AUTH');
    const userData = await this.authService.login(payloadData);
    if (!userData) {
      res.status(HttpErrorStatus.BadRequest).send('wrong credentials');
      return;
    }
    // set session cookie
    res.json(userData);
  }
  public logout(req: Request, res: Response, next: NextFunction) {}
}

export const authController = new AuthController();
