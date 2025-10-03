import { Router } from 'express';
import { isAuthenticated } from '../../middlewares/auth.middleware';
import { postController } from './post.controller';

export const postRouter = Router();

postRouter.use(isAuthenticated);

// post "/""
postRouter.post('/', postController.create);

// get "/"
postRouter.get('/', postController.findAll);
// get "/:id"
// patch "/:id"
// delete "/:id"
