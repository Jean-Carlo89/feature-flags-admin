import { FeatureFlagInMemoryRepository } from '../../../infra/in-memory/flag-in-memory.repository';
import {
  CreateFeatureFlagUseCase,
  CreateFlagInput,
} from '../create-flag.use-case';

describe('CreateFeatureFlagUseCase Unit tests', () => {
  let useCase: CreateFeatureFlagUseCase;

  let repository: FeatureFlagInMemoryRepository;

  let date: Date;

  beforeEach(() => {
    repository = new FeatureFlagInMemoryRepository();
    useCase = new CreateFeatureFlagUseCase(repository);
    date = new Date();
  });

  it('Should create a flag', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');

    let input: CreateFlagInput = {
      name: 'testing use case',
      is_active: true,
      description: 'testing description',
    };
    let result = await useCase.execute(input);

    expect(spyInsert).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual({
      id: repository.items[0].id,
      name: 'testing use case',
      is_active: true,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
      description: 'testing description',
    });

    input = {
      name: 'testing use case 2',
      is_active: false,
      description: 'testing description 2',
    };

    result = await useCase.execute(input);

    expect(spyInsert).toHaveBeenCalledTimes(2);

    expect(result).toStrictEqual({
      id: repository.items[1].id,
      name: 'testing use case 2',
      is_active: false,
      created_at: repository.items[1].created_at,
      updated_at: repository.items[1].updated_at,
      description: 'testing description 2',
    });
  });
});
