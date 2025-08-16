import { Router } from 'express';
import { authController } from './auth.controller';
import { uploadSingle } from '../../config/multer.config';

const router = Router();

// POST /api/auth - Get all users
router.post('/register', authController.register);

// GET /api/users/:uid - Get user by ID
// router.post('/login', userController.getUser);

// // POST /api/users - Create user (with optional avatar)
// router.post('/logout', uploadSingle('avatar'), userController.createUser);

export const userRouter = router;
