import mongoose, { Document, FlatRecord } from 'mongoose';
import { getEnvOrThrow } from '../utils/util';
import { removeFields } from '../utils/object.util';

mongoose
  .connect(getEnvOrThrow('MONGODB_URL'))
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error', err));

export const schemaToJsonDefaultOption = {
  virtuals: true,
  transform: (doc: Document, ret: FlatRecord<Record<string, unknown>>) => {
    return removeFields(ret, ['_id', '__v', 'password']);
  }
};

export const mongooseConnection = mongoose.connection;
