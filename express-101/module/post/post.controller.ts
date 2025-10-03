import { postService as _postService, PostServiceType } from './post.service';
import { Request } from 'express';
import { CreatePostDTO } from './types/dto';
import { zodValidation } from '../../utils/zod.util';
import { postSchema } from './util/post.schema';
export class PostController {
  constructor(private postService: PostServiceType = _postService) {}

  findAll = async (
    req: Request<{}, {}, {}, { page?: string; limit?: string }>,
    res: Express.Response
  ) => {
    const { page, limit } = req.query;
    const pageQuery = Number(page) || 1;
    const limitQuery = Number(limit) || 10;

    const { posts, postsCount } = await this.postService.getAllPosts(
      pageQuery,
      limitQuery
    );

    res.paginationResponse(posts, {
      page: pageQuery,
      limit: limitQuery,
      totalRecords: postsCount
    });
  };

  create = async (
    req: Request<{}, {}, CreatePostDTO>,
    res: Express.Response
  ) => {
    const post = zodValidation(postSchema, req.body, 'POST');
    const newPost = await this.postService.createPost(post);
    res.create(newPost);
  };
}

export const postController = new PostController();
