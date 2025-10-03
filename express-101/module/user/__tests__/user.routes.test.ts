import { createRandomUser } from '../../../seeds/user.seed';
import {
  authedTestAgent,
  unAuthedTestAgent
} from '../../../tests/helper/supertest.helper';
import { extractFields } from '../../../utils/object.util';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
describe('user routes endpoints', () => {
  it('GET /api/v1/users with unauthed agent will throw error', async () => {
    const response = await unAuthedTestAgent.get('/api/v1/users');
    expect(response.status).toBe(401);
  });
  it('GET /api/v1/users should return array of users', async () => {
    const pageQuery = 2;
    const limitQuery = 5;
    const response = await authedTestAgent.get(
      `/api/v1/users?page=${pageQuery}&limit=${limitQuery}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array),
      meta: expect.objectContaining({
        page: pageQuery,
        limit: limitQuery,
        totalRecords: expect.any(Number),
        totalPages: expect.any(Number)
      })
    });

    if (response.body.data.length) {
      const userArr = response.body.data as User[];
      expect(userArr[0]).toMatchObject({
        name: expect.any(String),
        email: expect.any(String)
      });
    }

    console.log(response.body.data[0]);
  });

  it('POST /api/v1/users should Create user and return user and its saved to DB  ', async () => {
    const newUserSeeds = extractFields(createRandomUser(), [
      'name',
      'password',
      'email'
    ]);
    const response = await authedTestAgent
      .post('/api/v1/users')
      .send({ ...newUserSeeds, email: 'ahmed@gmail.com' });
    // check the response

    expect(response.status).toBe(201);
    // check that user saved in db

    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining<Partial<User>>({
        name: newUserSeeds.name,
        email: 'ahmed@gmail.com'
      })
    });

    const userRepository = new UserRepository();
    const createdUser = userRepository.findByEmail(newUserSeeds.email);

    expect(createdUser).toBeDefined();
    expect(Object.keys(createdUser!).length).toBeGreaterThanOrEqual(6);
  });
});
