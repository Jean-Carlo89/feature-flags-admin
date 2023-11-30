import { FeatureFlag } from '@core/feature-flag/domain/FeatureFlag.entity';
import { IFeatureFlagRepository } from '@core/feature-flag/domain/FeatureFlag.repository';
import { IUseCase } from '@core/shared/application/use-case.interface';

export type ListFeatureFlagInput = { per_page?: number; index?: number };

export type ListFeatureFlagOutput = FeatureFlag[];

export class ListFeatureFlagsUseCase
  implements IUseCase<ListFeatureFlagInput, ListFeatureFlagOutput>
{
  private FeatureFlagRepository: IFeatureFlagRepository;

  constructor(repo: IFeatureFlagRepository) {
    this.FeatureFlagRepository = repo;
  }

  async execute(input?: ListFeatureFlagInput): Promise<ListFeatureFlagOutput> {
    const result = await this.FeatureFlagRepository.findAll(
      input?.per_page,
      input?.index,
    );

    return result;
  }
}
