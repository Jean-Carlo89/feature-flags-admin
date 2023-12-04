import { FeatureFlag } from '../../../feature-flag/domain/FeatureFlag.entity';
import { IFeatureFlagRepository } from '../../../feature-flag/domain/FeatureFlag.repository';
import { IUseCase } from '../../../shared/application/use-case.interface';

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
    if (typeof input?.per_page !== 'number') {
      delete input?.per_page;
    }

    if (typeof input?.index !== 'number') {
      delete input?.index;
    }

    if (!input?.per_page) {
      delete input?.per_page;
    }

    if (!input.index) {
      delete input?.index;
    }

   
    const result = await this.FeatureFlagRepository.findAll(
      input?.per_page,
      input?.index,
    );

 

    return result;
  }
}
