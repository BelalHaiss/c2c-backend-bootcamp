import { User } from 'generated/prisma';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';
export const generateUserSeed = () => {
  const seededUser: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'> =
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      role: faker.helpers.arrayElement(['CUSTOMER', 'MERCHANT']),
    };
  return seededUser;
};

export const getMerchantUser = async () =>
  ({
    name: 'Merchant',
    email: 'merchant@example.com',
    password: await argon.hash('1234567'),
    role: 'MERCHANT',
  }) as const;
