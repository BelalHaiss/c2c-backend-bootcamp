import mongoose, { ObjectId } from 'mongoose';
import { User } from './user.entity';
import { removeFields } from '../../utils/object.util';
import { schemaToJsonDefaultOption } from '../../services/mongoose.service';

const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: null },
    postCounts: { type: Number, default: 0 },
    password: {
      type: String,
      validate: {
        validator: function (passwordValue: string) {
          return passwordValue.length >= 6;
        },
        message: 'Password should be at least 6 characters long'
      }
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: schemaToJsonDefaultOption
  }
);

export const UserModel = mongoose.model<User>('User', userSchema);
