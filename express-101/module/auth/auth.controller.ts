import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AuthService } from './auth.service';
import { HttpErrorStatus, StringObject } from '../../utils/util.types';
import {
  LoginDTO,
  LoginResponseDTO,
  LoginResponseDTOWithJWT,
  RegisterDTO,
  RegisterResponseDTO
} from './types/auth.dto';
import { zodValidation } from '../../utils/zod.util';
import { loginDTOSchema, registerDTOSchema } from './util/auth.schema';
import { deleteUploadedAsset } from '../../utils/assets.util';
import { singJWT } from './util/jwt.util';

export class AuthController {
  private authService = new AuthService();

  public async register(
    req: Request<StringObject, StringObject, RegisterDTO>,
    res: Response<RegisterResponseDTO | string>,
    next: NextFunction
  ) {
    try {
      const payloadData = zodValidation<RegisterDTO>(
        registerDTOSchema,
        req.body,
        'AUTH'
      );
      const user = await this.authService.register(payloadData);
      res.create(user);
    } catch (error) {
      if (req.file) {
        await deleteUploadedAsset(req.file?.filename!);
      }
      res.error({
        message: 'internal server error',
        statusCode: HttpErrorStatus.InternalServerError
      });
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
    console.log(req.session, 'before i set the req.session');
    req.session.userId = userData.id;

    //  express session => create new entity  { 12345: { userId:123213} } => save memory
    // express session on  response it will send the cookie with same key on session memory [abc] and sign it with my secret
    res.ok(userData);
  }
  public async loginWithJWT(
    req: Request<StringObject, StringObject, LoginDTO>,
    res: Response<LoginResponseDTOWithJWT | string>,
    next: NextFunction
  ) {
    const payloadData = zodValidation(loginDTOSchema, req.body, 'AUTH');
    const userData = await this.authService.login(payloadData);
    if (!userData) {
      res.status(HttpErrorStatus.BadRequest).send('wrong credentials');
      return;
    }
    const token = singJWT({ sub: userData.id, name: userData.name });
    res.ok({ user: userData, token });
  }
  public async logout(req: Request, res: Response, next: NextFunction) {
    req.session.destroy(function (err) {
      if (err) {
        next(err);
      } else {
        res.clearCookie('connect.sid');
        res.ok({});
      }
    });
  }
}

export const authController = new AuthController();
