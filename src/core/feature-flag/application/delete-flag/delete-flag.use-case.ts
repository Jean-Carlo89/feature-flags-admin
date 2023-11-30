import { IFeatureFlagRepository } from '@core/feature-flag/domain/FeatureFlag.repository';

export class DeleteFeatureFlagUseCase {
  private FeatureFlagRepository: IFeatureFlagRepository;

  constructor(private FeatureFlagRepo: IFeatureFlagRepository) {
    this.FeatureFlagRepository = FeatureFlagRepo;
  }

  async execute(
    input: DeleteFeatureFlagInput,
  ): Promise<DeleteFeatureFlagOutput> {
    const id = input.id;

    await this.FeatureFlagRepository.delete(id);
  }
}

export type DeleteFeatureFlagInput = {
  id: string;
};
type DeleteFeatureFlagOutput = void;
