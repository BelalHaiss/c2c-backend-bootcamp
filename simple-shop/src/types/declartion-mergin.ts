// add user to express request

import ImageKit from '@imagekit/nodejs';
import { UserResponseDTO } from 'src/modules/auth/dto/auth.dto';
export type EnvVariables = {
  JWT_SECRET: string;
  IMAGEKIT_SECRET_KEY: string;
  NODE_ENV: 'development' | 'production';
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Multer {
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
      interface File extends ImageKit.Files.FileUploadResponse {}
    }
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
