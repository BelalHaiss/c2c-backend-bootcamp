import { faker } from '@faker-js/faker';
import { User } from '../module/user/user.entity';

export function createRandomUser() {
  const randomUser: User = {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.anytime()
  };
  return randomUser;
}
