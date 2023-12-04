import { GetUserUseCase } from '../../../core/user/application/get-user-use-case/get-user.use-case';
import {
  CreateUserInput,
  CreateUserUseCase,
} from '../../../core/user/application/create-user/create-user.use-case';
import { UserMongoRepository } from '../../../core/user/infra/mongo/user.mongo.repository';
import { Router } from 'express';
import { compare_hash } from '../../../core/shared/helpers/compare-hash';
import { generate_jwt_token } from '../../../core/shared/helpers/generate_jwt';

const users_router = Router();

users_router.post('/', async (req, res, next) => {
  try {
    //**** Sanitize input */

    const input_data = JSON.parse(req.body);

    const input = { ...input_data };
    const repo = new UserMongoRepository();
    const useCase = new CreateUserUseCase(repo);

    const updated_input: CreateUserInput = {
      id: input.email,
      name: input.name,
      email: input.email,
      password: input.password,
    };
    await useCase.execute(updated_input);

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

users_router.post('/login', async (req, res, next) => {
  try {
    //**** Sanitize input */

    const input_data = JSON.parse(req.body);

    const { email, password } = input_data;

    const repo = new UserMongoRepository();
    const useCase = new GetUserUseCase(repo);

    const user = await useCase.execute({ id: email });

    if (compare_hash(password, user.password)) {
      const response = {
        token: generate_jwt_token(user.id),
        user: { id: user.id, name: user.name },
      };

      return res.status(200).send(response);
    } else {
      return res.status(400).send('Email ou senha incorretos');
    }
  } catch (error) {
    next(error);
  }
});

export { users_router };
