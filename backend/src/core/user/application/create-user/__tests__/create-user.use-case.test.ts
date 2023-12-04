import { UserInMemoryRepository } from '../../../infra/in-memory/user-in-memory.respository';
import { CreateUserUseCase, CreateUserInput } from '../create-user.use-case';

describe('CreateFeatureFlagUseCase Unit tests', () => {
  let useCase: CreateUserUseCase;

  let repository: UserInMemoryRepository;

  let date: Date;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    useCase = new CreateUserUseCase(repository);
    date = new Date();
  });

  it('Should create a flag', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    let input: CreateUserInput = {
      email: 'testing use case',

      password: 'testing password',
      name: 'testing use case name',
    };
    let result = await useCase.execute(input);

    expect(spyInsert).toHaveBeenCalledTimes(1);

    delete result.password;

    expect(result).toStrictEqual({
      id: repository.items[0].id,
      email: 'testing use case',
      name: 'testing use case name',
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
      // password: 'testing password',
    });

    input = {
      email: 'testing use case 2',
      name: 'test',
      password: 'testing password 2',
    };

    result = await useCase.execute(input);

    expect(spyInsert).toHaveBeenCalledTimes(2);
    delete result.password;
    expect(result).toStrictEqual({
      id: repository.items[1].id,
      email: 'testing use case 2',
      name: 'test',

      created_at: repository.items[1].created_at,
      updated_at: repository.items[1].updated_at,
      //password: 'testing password 2',
    });
  });
});
