import express, { Request, Response, NextFunction } from 'express';
import path from 'node:path';
import fs from 'node:fs';
const PORT = 4000;
const app = express();

// global middleware that handle parseing the request and call next under the hood
app.use((req, res, next) => {
  console.log(req.path, 'is hit');
  next();
});

app.use(express.json());
app.use(express.urlencoded());

app.use(
  express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
      res.setHeader('cache-control', `public max-age=${5}`);
    }
  })
);

// app.use('/users', authMiddleware);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // alert system
  console.log(error);
  res.status(500).json({ success: false, message: 'internal server' });
});

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
app.listen(PORT, () => {
  console.log('App is running in port: ', PORT);
});
