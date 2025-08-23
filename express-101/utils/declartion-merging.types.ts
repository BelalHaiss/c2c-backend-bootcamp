declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

export type MyEnvs = {
  PORT: string;
  NODE_ENV: 'development' | 'production';
  SESSION_SECRET: string;
  JWT_SECRET: string;
};
declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyEnvs {}
  }
}
