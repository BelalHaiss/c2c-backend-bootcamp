import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { createRandomUser } from './user.seed';
import '../services/mongoose.service';
import { UserModel } from '../module/user/user.model';
import mongoose from 'mongoose';

const seedDataInMongoose = async () => {
  // we need to make sure mongoose is connected before we seed data with while loop
  while (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  const usersSeeds = faker.helpers.multiple(createRandomUser, { count: 50 });
  await UserModel.create(usersSeeds);
  console.log('Seeded users in MongoDB');
  process.exit(0);
};

seedDataInMongoose();
