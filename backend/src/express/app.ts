import cors from 'cors';
import { ValidationError } from '../core/shared/domain/errors/ValidationError';
import { NotFoundError } from '../core/shared/domain/errors/NotFoundError';
import express, { NextFunction, Request, Response } from 'express';
import { feature_flags_router } from './routes/feature-flags/router';
import { users_router } from './routes/users/router';
import { verify_header_token_middleware } from '../core/shared/middleware/verify_token_middleware';
const app = express();

app.use(
  cors({
    origin: [
      'http://app-front:3000',
      'https://app-front:3000',
      'http://app-front:3001',
      'https://app-front:3001',
      'http://app-front:8001',
      'https://app-front:8001',
      'http://app-front:8000',
      'https://app-front:8000',
      'http://localhost:3000',
      '*',
    ],

    methods: ['GET', 'POST', 'DELETE', 'PUT', 'HEAD', 'PATCH', 'OPTIONS'],

    maxAge: 864000,

    allowedHeaders: ['Content-Type', 'Authorization'],

    optionsSuccessStatus: 200,
  }),
);

app.use(express.json({ limit: '20mb' }));

app.use(express.text());

app.get('/', function (req, res) {
  res.send('Hello There');
});

//verify_header_token_middleware,
app.use(
  '/api/feature-flags',
  verify_header_token_middleware,
  feature_flags_router,
);

app.use('/api/users', users_router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  console.log(err.message);

  if (err instanceof ValidationError) {
    return res.status(400).json(err.message);
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json(err.message);
  }

  return res.status(500).send('Internal server error');
});

export { app };
