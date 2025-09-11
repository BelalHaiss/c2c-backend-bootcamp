import { app } from '../../server';
import { usersData } from '../../module/user/user.data';
import supertest from 'supertest';
import { singJWT } from '../../module/auth/util/jwt.util';

const user1 = usersData[0]!;
//  generate token
const token = singJWT({ name: user1.name, sub: user1.id });

export const unAuthedTestAgent = supertest.agent(app);

export const authedTestAgent = supertest
  .agent(app)
  .set('AUTHORIZATION', `Bearer ${token}`);
