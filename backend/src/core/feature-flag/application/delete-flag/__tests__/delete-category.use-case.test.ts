import { FeatureFlagInMemoryRepository } from '../../../../feature-flag/infra/in-memory/flag-in-memory.repository';

import { DeleteFeatureFlagUseCase } from '../delete-flag.use-case';
import {
  FeatureFlag,
  FeatureFlagProps,
} from '../../../../feature-flag/domain/FeatureFlag.entity';

describe('Delete Feature Flag use case unit tests', () => {
  let useCase: DeleteFeatureFlagUseCase;
  let repo: FeatureFlagInMemoryRepository;

  beforeEach(() => {
    repo = new FeatureFlagInMemoryRepository();
    useCase = new DeleteFeatureFlagUseCase(repo);
  });

  it('should delete flag', async () => {
    const spyDelete = jest.spyOn(repo, 'delete');
    const props: FeatureFlagProps = {
      name: 'gggg',
      is_active: false,
    };
    const flag = new FeatureFlag(props);

    repo.items = [flag];

    expect(repo.items).toHaveLength(1);

    await useCase.execute({ id: flag.id });

    expect(spyDelete).toHaveBeenCalledTimes(1);

    expect(repo.items).toHaveLength(0);
  });
});
