import { array } from 'zod';
import {
  ApiResponseMeta,
  UnifiedApiErrorResponse
} from '../middlewares/response.middleware';
import { CalculatePaginationMetaParams } from './api-util';

declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

export type MyEnvs = {
  PORT: string;
  NODE_ENV: 'development' | 'production' | 'test';
  SESSION_SECRET: string;
  JWT_SECRET: string;
  MONGODB_URL: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyEnvs {}
  }
  namespace Express {
    interface Response {
      create: (data: object) => this;
      ok: (data: object) => this;
      paginationResponse: (
        data: object,
        meta: CalculatePaginationMetaParams
      ) => this;
      error: (err: UnifiedApiErrorResponse) => this;
    }
  }
}
