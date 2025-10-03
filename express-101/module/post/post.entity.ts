import { ObjectId, SchemaDefinitionProperty } from 'mongoose';
import { User } from '../user/user.entity';

export type Post = {
  id: string;
  content: string;
  title: string;
  authorId: SchemaDefinitionProperty<ObjectId | User, Post>;
  createdAt: Date;
  updatedAt: Date;
};
