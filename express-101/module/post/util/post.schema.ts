import zod, { ZodType } from 'zod';
import { Post } from '../post.entity';
import { mongoObjectIdSchema } from '../../../utils/zod.util';

export const postSchema = zod.object({
  title: zod.string().min(1, 'Title is required'),
  content: zod.string().min(1, 'Content is required'),
  authorId: mongoObjectIdSchema
}) satisfies ZodType<Pick<Post, 'title' | 'content' | 'authorId'>>;
