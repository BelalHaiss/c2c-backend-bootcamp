import { array } from 'zod';
import { UnifiedApiErrorResponse } from '../middlewares/response.middleware';

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
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyEnvs {}
  }
  namespace Express {
    interface Response {
      create: (data: object) => this;
      ok: (data: object) => this;
      error: (err: UnifiedApiErrorResponse) => this;
    }
  }
}
