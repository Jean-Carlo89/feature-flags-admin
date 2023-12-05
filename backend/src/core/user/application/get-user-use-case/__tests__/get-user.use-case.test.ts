import { UserProps, User } from '../../../../user/domain/User.entity';
import { UserInMemoryRepository } from '../../../../user/infra/in-memory/user-in-memory.respository';
import { GetUserUseCase } from '../get-user.use-case';

describe('GetUserUseCase Unit tests', () => {
  let useCase: GetUserUseCase;

  let repository: UserInMemoryRepository;

  let date: Date;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new GetUserUseCase(repository);
    date = new Date();
  });

  it('should throws error when entity not found', async () => {
    try {
      await useCase.execute({ id: 'fake id', email: 'fake' } as any);
    } catch (e) {
      expect(e.message).toBe('User Not Found using ID fake id');
    }
  });

  it('Should find a feature User', async () => {
    const spyGet = jest.spyOn(repository, 'find');

    const fake_props: UserProps = {
      id: 'texto',
      email: 'email',
      name: 'ggg',
      password: 'desc',
    };

    const user = User.create(User.fake(fake_props));

    repository.insert(user);

    const result = await useCase.execute({ id: 'texto' });

    expect(spyGet).toHaveBeenCalledTimes(1);

    delete result.password;

    expect(result).toStrictEqual({
      id: fake_props.id,
      email: fake_props.email,
      name: fake_props.name,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });
  });

  it('Should return user password', async () => {
    const spyGet = jest.spyOn(repository, 'find');

    const fake_props: UserProps = {
      id: 'texto',
      email: 'email',

      password: 'desc',
    };

    const user = User.create(User.fake(fake_props));

    repository.insert(user);

    const result = await useCase.execute({ id: 'texto' });

    expect(spyGet).toHaveBeenCalledTimes(1);

    expect(result.password).toBeTruthy();
  });
});
