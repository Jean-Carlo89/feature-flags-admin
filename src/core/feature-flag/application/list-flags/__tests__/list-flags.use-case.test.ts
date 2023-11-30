import { FeatureFlagInMemoryRepository } from '../../../../feature-flag/infra/in-memory/flag-in-memory.repository';
import { ListFeatureFlagsUseCase } from '../list-flags.use-case';
import {
  FeatureFlag,
  FeatureFlagProps,
} from '../../../../feature-flag/domain/FeatureFlag.entity';

describe('List Feature Flags unit case', () => {
  let useCase: ListFeatureFlagsUseCase;
  let repository: FeatureFlagInMemoryRepository;

  beforeEach(() => {
    repository = new FeatureFlagInMemoryRepository();
    useCase = new ListFeatureFlagsUseCase(repository);
  });

  test('should get all flags', async () => {
    const spyList = jest.spyOn(repository, 'findAll');
    for (let i = 0; i < 25; i++) {
      const props: FeatureFlagProps = {
        name: `${i}name`,
        is_active: true,
      };

      const flag = new FeatureFlag(props);

      repository.items.push(flag);
    }

    expect(repository.items).toHaveLength(25);

    const result = await useCase.execute();

    expect(result).toHaveLength(20);
  });

  test('should get all flags', async () => {
    const spyList = jest.spyOn(repository, 'findAll');
    for (let i = 0; i < 25; i++) {
      const props: FeatureFlagProps = {
        name: `${i}name`,
        is_active: true,
      };

      const flag = new FeatureFlag(props);

      repository.items.push(flag);
    }

    expect(repository.items).toHaveLength(25);

    const result = await useCase.execute({ per_page: 5 });

    expect(result).toHaveLength(5);
  });

  test('should get all flags', async () => {
    const spyList = jest.spyOn(repository, 'findAll');
    for (let i = 0; i < 25; i++) {
      const props: FeatureFlagProps = {
        name: `${i}name`,
        is_active: true,
      };

      const flag = new FeatureFlag(props);

      repository.items.push(flag);
    }

    expect(repository.items).toHaveLength(25);

    const result = await useCase.execute({ per_page: 15, index: 20 });
    expect(result).toHaveLength(5);
    expect(result[0].name).toBe('20name');
    expect(result[result.length - 1].name).toBe('24name');
  });
});
