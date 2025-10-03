// schema

import { model, Schema } from 'mongoose';
import { Post } from './post.entity';
import { schemaToJsonDefaultOption } from '../../services/mongoose.service';
import { userMongoRepository } from '../user/user-mongo-repository';

const postSchema = new Schema<Post>(
  {
    content: { type: 'String', required: true },
    title: { type: 'String', required: true },
    authorId: {
      type: 'ObjectId',
      ref: 'User',
      required: true,
      validate: {
        validator: async function (v: string) {
          const user = await userMongoRepository.findById(v);
          if (!user) throw new Error('Author not found');
        }
      }
    }
  },
  { timestamps: true, toJSON: schemaToJsonDefaultOption }
);

export const PostModel = model<Post>('Post', postSchema);
