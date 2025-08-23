import { RequestHandler, Router } from 'express';
import { authController } from './auth.controller';
import { uploadSingle } from '../../config/multer.config';

const router = Router();

// POST /api/auth - Get all users
router.post(
  '/register',
  uploadSingle('avatar'),
  authController.register.bind(authController)
);

// GET /api/users/:uid - Get user by ID
// TODO add middleware for zod validation
router.post(
  '/login',
  authController.login.bind(authController) as RequestHandler
);

router.post(
  '/login-jwt',
  authController.loginWithJWT.bind(authController) as RequestHandler
);

// POST /api/users - Create user (with optional avatar)
// router.post('/logout', uploadSingle('avatar'), userController.createUser);

export const authRouter = router;
