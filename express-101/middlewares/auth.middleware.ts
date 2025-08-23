import { NextFunction, Request, Response } from 'express';
import { userService } from '../module/user/user.service';
import { CustomError } from '../utils/exception';
import { HttpErrorStatus } from '../utils/util.types';
import { verifyJWT } from '../module/auth/util/jwt.util';
export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.userId) {
    const isUserStillExist = userService.isUserIdExist(req.session.userId);
    if (isUserStillExist) {
      next();
      return;
    }
  }
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const jwt = authHeader.replace(`Bearer `, '');
    console.log('jwt', jwt);
    try {
      const payload = verifyJWT(jwt);
      next();
      return;
    } catch (error) {
      console.log('jwt is wrong');
    }
  }
  next(
    new CustomError(
      'user is not Authenticated',
      'AUTH',
      HttpErrorStatus.Unauthorized
    )
  );
};
