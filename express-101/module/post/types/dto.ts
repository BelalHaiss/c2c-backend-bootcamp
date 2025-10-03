import { Post } from '../post.entity';

export type CreatePostDTO = Pick<Post, 'title' | 'content' | 'authorId'>;
