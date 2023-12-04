import { CreateUserUseCase } from '../create-user.use-case';
import {
  close_connection,
  connect_to_mongoDb,
} from '../../../../shared/infra/mongo/config';
import { MongoClient } from 'mongodb';
import { User } from '../../../../user/domain/User.entity';

import { IUserRepository } from '../../../../user/domain/User.repository';
import { UserMongoRepository } from '@core/user/infra/mongo/user.mongo.repository';
import { setupMongo } from '@core/shared/testing/helper';

setupMongo();

describe('Create User Use Case Integration tests', () => {
  let useCase: CreateUserUseCase;

  let repository: IUserRepository;

  beforeEach(() => {
    repository = new UserMongoRepository();
    useCase = new CreateUserUseCase(repository);
  });
  it('create user', async () => {
    const props = User.fake();

    //  const flag = new User(props);

    await useCase.execute(props);

    const user = await repository.find(props.id);

    expect(user.id).toBe(props.id);
  });
});
