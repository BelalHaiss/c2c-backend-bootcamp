import { ClientSession } from 'mongoose';
import { UserRepositoryI } from './interfaces/user-repo-interface';
import { User } from './user.entity';
import { UserModel } from './user.model';

class UserMongoRepository implements UserRepositoryI {
  async findAll(page: number, limit: number) {
    const users = await UserModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalRecords = await UserModel.countDocuments().exec();
    return { users, totalRecords };
  }

  findById(id: string): Promise<User | null> {
    return UserModel.findById(id).exec();
  }
  findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).exec();
  }
  create(
    name: string,
    email: string,
    password: string,
    avatar?: string
  ): Promise<User> {
    return UserModel.create({ name, email, password, avatar });
  }

  update(
    id: string,
    name?: string,
    email?: string,
    avatar?: string
  ): Promise<User | null> {
    return UserModel.findByIdAndUpdate(
      id,
      { name, email, avatar },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);

    return Boolean(result);
  }

  incrementPostCount(
    id: string,
    action: 'increment' | 'decrement',
    session: ClientSession
  ) {
    const updatedCount = action === 'increment' ? 1 : -1;

    return UserModel.updateOne(
      { _id: id },
      { $inc: { postCounts: updatedCount } },
      { session }
    ).exec();
  }
}

export const userMongoRepository = new UserMongoRepository();
