import { CreateFeatureFlagUseCase } from '../core/feature-flag/application/create-feature-flag/create-flag.use-case';
import { FeatureFlagMongoRepository } from '../core/feature-flag/infra/mongo/feature-flag-mongo.repository';
import cors from 'cors';
import { ValidationError } from '../core/shared/domain/errors/ValidationError';
import { NotFoundError } from '../core/shared/domain/errors/NotFoundError';
import express, { NextFunction, Request, Response } from 'express';
import { GetFeatureFlagUseCase } from '../core/feature-flag/application/get-flag-use-case/get-flag.use-case';
import { UpdateFeatureFlagUseCase } from '../core/feature-flag/application/update-feature-flag/update-flag.use-case';
import { ListFeatureFlagsUseCase } from '../core/feature-flag/application/list-flags/list-flags.use-case';
import { DeleteFeatureFlagUseCase } from '../core/feature-flag/application/delete-flag/delete-flag.use-case';
const app = express();

app.use(
  cors({
    origin: [['http://app-front:3000', 'http://localhost:300', '*']],

    methods: ['GET', 'POST', 'DELETE', 'PUT', 'HEAD', 'PATCH', 'OPTIONS'],

    maxAge: 864000,

    allowedHeaders: ['Content-Type', 'Authorization'],

    credentials: true,

    optionsSuccessStatus: 200,
  }),
);

app.use(express.json({ limit: '20mb' }));

app.use(express.text());

app.get('/', function (req, res) {
  res.send('Hello There');
});

app.post('/feature-flags', async (req, res, next) => {
  try {
    //**** Sanitize input */

    const input = { ...req.body };

    const repo = new FeatureFlagMongoRepository();
    const useCase = new CreateFeatureFlagUseCase(repo);

    await useCase.execute(input);

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

app.get('/feature-flags/:id', async (req, res, next) => {
  try {
    //**** Sanitize input */

    const input = { id: req.params.id };
    const repo = new FeatureFlagMongoRepository();
    const useCase = new GetFeatureFlagUseCase(repo);

    const result = await useCase.execute(input);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

app.patch('/feature-flags/:id', async (req, res, next) => {
  try {
    //**** Sanitize input */

    const input = { id: req.params.id };
    const repo = new FeatureFlagMongoRepository();
    const useCase = new UpdateFeatureFlagUseCase(repo);
    console.log({ input });
    const result = await useCase.execute(input);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.get('/feature-flags', async (req, res, next) => {
  try {
    //**** Sanitize input */

    const input = { ...req.body };
    const repo = new FeatureFlagMongoRepository();
    const useCase = new ListFeatureFlagsUseCase(repo);

    const result = await useCase.execute(input);

    return res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

app.delete('/feature-flags/:id', async (req, res, next) => {
  try {
    //**** Sanitize input */

    const input = { id: req.params.id };
    const repo = new FeatureFlagMongoRepository();
    const useCase = new DeleteFeatureFlagUseCase(repo);

    await useCase.execute(input);

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  console.log(err.message);

  if (err instanceof ValidationError) {
    return res.status(400).json(err.message);
  }

  return res.status(500).send('Internal server error');
});

export { app };
