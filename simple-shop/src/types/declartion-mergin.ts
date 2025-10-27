// add user to express request

import { UserResponseDTO } from 'src/modules/auth/dto/auth.dto';
export type EnvVariables = {
  JWT_SECRET: string;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: UserResponseDTO['user'];
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends EnvVariables {}
  }

  interface BigInt {
    toJSON(): string;
  }
}

// bigint toJson convert to string workaround
