import { FeatureFlag } from '../../../feature-flag/domain/FeatureFlag.entity';
import { IFeatureFlagRepository } from '../../../feature-flag/domain/FeatureFlag.repository';
import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';

export class DeleteFeatureFlagUseCase {
  private FeatureFlagRepository: IFeatureFlagRepository;

  constructor(FeatureFlagRepo: IFeatureFlagRepository) {
    this.FeatureFlagRepository = FeatureFlagRepo;
  }

  async execute(
    input: DeleteFeatureFlagInput,
  ): Promise<DeleteFeatureFlagOutput> {
    const id = input.id;

    const flag = await this.FeatureFlagRepository.find(id);

    if (!flag) {
      throw new NotFoundError(id, FeatureFlag);
    }

    await this.FeatureFlagRepository.delete(id);
  }
}

export type DeleteFeatureFlagInput = {
  id: string;
};
type DeleteFeatureFlagOutput = void;
