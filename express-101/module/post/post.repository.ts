import { ClientSession } from 'mongoose';
import { Post } from './post.entity';
import { PostModel } from './post.model';
import { CreatePostDTO } from './types/dto';

class PostRepository {
  async createPost(
    post: CreatePostDTO,
    txSession: ClientSession
  ): Promise<Post> {
    const [createdPost] = await PostModel.create([post], {
      session: txSession
    });
    return createdPost!.populate('authorId');
  }

  async getPostById(id: string) {
    const post = await PostModel.findById(id).populate('authorId').exec();
    return post;
  }

  async getAllPosts(page: number, limit: number) {
    const posts = await PostModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('authorId');

    const postsCount = await PostModel.countDocuments();
    return { posts, postsCount };
  }

  async updatePost(id: string, post: Partial<Post>): Promise<Post | null> {
    return PostModel.findByIdAndUpdate(id, post, { new: true });
  }

  async deletePost(id: string, session: ClientSession): Promise<Post | null> {
    return PostModel.findByIdAndDelete(id, { session });
  }
}

export const postRepository = new PostRepository();
