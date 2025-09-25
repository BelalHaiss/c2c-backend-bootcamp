import { faker } from '@faker-js/faker';
import { Post } from '../generated/prisma';

export function createRandomPost() {
  const randomPost: Omit<Post, 'authorId' | 'id'> = {
    title: faker.lorem.sentence(),
    content: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.anytime()
  };
  return randomPost;
}
