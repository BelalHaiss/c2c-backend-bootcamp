import { faker } from '@faker-js/faker';
import { PrismaClient } from '../../generated/prisma';
import { createRandomUser } from '../../seeds/user.seed';
import { createRandomPost } from '../../seeds/posts.seed';

const prisma = new PrismaClient();

async function main() {
  // delete all tables db
  await prisma.user.deleteMany({});

  const users = faker.helpers.multiple(createRandomUser, { count: 10 });
  for (const userData of users) {
    await prisma.user.create({
      data: {
        ...userData,
        posts: {
          createMany: {
            data: faker.helpers.multiple(createRandomPost, { count: 5 })
          }
        }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
