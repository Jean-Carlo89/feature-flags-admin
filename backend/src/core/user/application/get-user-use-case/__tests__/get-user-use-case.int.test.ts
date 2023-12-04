import { NotFoundError } from '../../../../shared/domain/errors/NotFoundError';
import { setupMongo } from '../../../../shared/testing/helper';
import { User } from '../../../../user/domain/User.entity';
import { UserMongoRepository } from '../../../../user/infra/mongo/user.mongo.repository';
import { GetUserUseCase } from '../get-user.use-case';

setupMongo();

describe('get User Use Case Integration tests', () => {
  let useCase: GetUserUseCase;

  let repository: UserMongoRepository;

  beforeEach(() => {
    repository = new UserMongoRepository();
    useCase = new GetUserUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const id = 'random';
    await expect(() => useCase.execute({ id: id })).rejects.toThrow(
      new NotFoundError(id, User),
    );
  });
  it('should get user', async () => {
    const props = User.fake();

    const user = new User(props);

    await repository.insert(user);

    const get_user = await useCase.execute({ id: user.id });

    expect(get_user).toStrictEqual(user.toJSON());
  });
});
