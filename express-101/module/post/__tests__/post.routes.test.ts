import { faker } from '@faker-js/faker';
import { createRandomUser } from '../../../seeds/user.seed';
import { authedTestAgent } from '../../../tests/helper/supertest.helper';
import { userMongoRepository } from '../../user/user-mongo-repository';
import { CreatePostDTO } from '../types/dto';

describe('user routes endpoints', () => {
  beforeEach(async () => {
    // Clean up test data before each test if needed
  });

  it('POST /api/v1/posts should Create post and return post without author and its saved to DB  ', async () => {
    // create user in db

    const newUser = createRandomUser();

    const createdUser = await userMongoRepository.create(
      newUser.name,
      newUser.email,
      newUser.password
    );
    const newPostSeed: CreatePostDTO = {
      title: faker.lorem.slug(),
      content: faker.lorem.paragraphs(2),
      authorId: createdUser.id
    };
    const response = await authedTestAgent
      .post('/api/v1/posts')
      .send(newPostSeed);
    // check the response

    expect(response.status).toBe(201);
    // check that user saved in db
    console.log(response.body.data, 'data from api response ');
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        title: newPostSeed.title,
        content: newPostSeed.content
      })
    });
  });
  // it('GET /api/v1/posts should return array of posts', async () => {
  //   const pageQuery = 2;
  //   const limitQuery = 5;
  //   const response = await authedTestAgent.get(
  //     `/api/v1/users?page=${pageQuery}&limit=${limitQuery}`
  //   );
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toEqual({
  //     success: true,
  //     data: expect.any(Array),
  //     meta: expect.objectContaining({
  //       page: pageQuery,
  //       limit: limitQuery,
  //       totalRecords: expect.any(Number),
  //       totalPages: expect.any(Number)
  //     })
  //   });

  //   if (response.body.data.length) {
  //     const userArr = response.body.data as User[];
  //     expect(userArr[0]).toMatchObject({
  //       name: expect.any(String),
  //       email: expect.any(String)
  //     });
  //   }

  //   console.log(response.body.data[0]);
  // });
});
