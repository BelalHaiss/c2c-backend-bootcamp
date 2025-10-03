import { faker } from '@faker-js/faker';
import { User } from '../module/user/user.entity';

export function createRandomUser() {
  const randomUser: Omit<User, 'id' | 'createdAt' | 'updatedAt'> = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    avatar: faker.image.avatar()
  };
  return randomUser;
}
