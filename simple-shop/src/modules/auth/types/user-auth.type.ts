import { UserRole } from 'generated/prisma';

export type JSON_Web_Token_Payload = {
  sub: string;
  role: UserRole;
};
