import { createRandomUser } from '../../seeds/user.seed';
import { User } from './user.entity';
import { faker } from '@faker-js/faker';

export const usersData: User[] = faker.helpers.multiple(createRandomUser, {
  count: 5
});
