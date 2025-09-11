import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { userRouter } from './module/user/user.routes';
import { handleError } from './utils/exception';
import { authRouter } from './module/auth/auth.routes';
import session from 'express-session';
import { isProduction } from './config/app.config';

import { getEnvOrThrow } from './utils/util';
import { responseEnhancer } from './middlewares/response.middleware';

const PORT = getEnvOrThrow('PORT');

export const app = express();

// global middleware that handle parseing the request and call next under the hood

app.use(express.json());
// check if its content-header and if its json => handle stream and   decode  && desrialize => req.body    {}
app.use(express.urlencoded());
app.use(responseEnhancer);
app.use(
  session({
    secret: [getEnvOrThrow('SESSION_SECRET')],
    resave: false,
    saveUninitialized: false,
    cookie: { secure: isProduction, maxAge: 1000 * 60 * 60 * 24 * 30 }
  })
);

app.use(
  express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
      res.setHeader('cache-control', `public max-age=${5}`);
    }
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
// app.use('/users', authMiddleware);

const notFoundPath = path.join(__dirname, 'public', '404.html');

// Read the 404.html template for dynamic content
const NotFoundPageHTML = fs.readFileSync(notFoundPath, 'utf8');

// fallback for any un defined route --> 404
app.use((req: Request, res: Response) => {
  // Check if it's an API route
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: `Route ${req.method} ${req.path} not found`
    });
  }

  const dynamicHtml = NotFoundPageHTML.replace(/{{requestedPath}}/g, req.path)
    .replace(/{{method}}/g, req.method)
    .replace(/{{timestamp}}/g, new Date().toLocaleString());

  // For static files, use the dynamic 404 template

  res.status(404).send(dynamicHtml);
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  handleError(error, res);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log('App is running in port: ', PORT);
  });
}
