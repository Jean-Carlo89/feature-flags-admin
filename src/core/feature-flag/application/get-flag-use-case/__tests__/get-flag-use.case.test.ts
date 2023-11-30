import {
  FeatureFlag,
  FeatureFlagProps,
} from '../../../domain/FeatureFlag.entity';
import { FeatureFlagInMemoryRepository } from '../../../infra/in-memory/flag-in-memory.repository';
import { CreateFlagInput } from '../../create-feature-flag/create-flag.use-case';
import { GetFeatureFlagUseCase, GetFlagInput } from '../get-flag.use-case';

describe('GetFeatureFlagUseCase Unit tests', () => {
  let useCase: GetFeatureFlagUseCase;

  let repository: FeatureFlagInMemoryRepository;

  let date: Date;

  beforeEach(() => {
    repository = new FeatureFlagInMemoryRepository();
    useCase = new GetFeatureFlagUseCase(repository);
    date = new Date();
  });

  it('should throws error when entity not found', async () => {
    try {
      await useCase.execute({ id: 'fake id', name: 'fake' } as any);
    } catch (e) {
      expect(e.message).toBe('FeatureFlag Not Found using ID fake id');
    }
  });

  it('Should find a feature flag', async () => {
    const spyGet = jest.spyOn(repository, 'find');

    const fake_props: FeatureFlagProps = {
      id: 'texto',
      name: 'name',
      is_active: false,
      description: 'desc',
    };

    const flag = FeatureFlag.create(FeatureFlag.fake(fake_props));

    repository.insert(flag);

    const result = await useCase.execute({ id: 'texto' });

    expect(spyGet).toHaveBeenCalledTimes(1);

    expect(result).toStrictEqual({
      id: fake_props.id,
      name: fake_props.name,
      is_active: fake_props.is_active,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
      description: fake_props.description,
    });
  });
});
