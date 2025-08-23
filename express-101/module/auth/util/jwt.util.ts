import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { getEnvOrThrow } from '../../../utils/util';
// sing

type JWT_PAYLOAD = { sub: string; name: string };
const JWT_SECRET = getEnvOrThrow('JWT_SECRET');
export const singJWT = (payload: JWT_PAYLOAD, options?: SignOptions) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
};

export const verifyJWT = (token: string): JWT_PAYLOAD => {
  return jwt.verify(token, JWT_SECRET) as JWT_PAYLOAD;
};
