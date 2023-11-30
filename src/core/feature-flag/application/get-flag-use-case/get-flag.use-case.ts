import { FeatureFlag } from '../../../feature-flag/domain/FeatureFlag.entity';
import { IFeatureFlagRepository } from '../../../feature-flag/domain/FeatureFlag.repository';
import { IUseCase } from '../../../shared/application/use-case.interface';

export type GetFlagInput = {
  id?: string;
};

export type GetFlagOutput = {
  id?: string;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at: Date;
  is_active: boolean;
};

export class GetFeatureFlagUseCase
  implements IUseCase<GetFlagInput, GetFlagOutput>
{
  private FeatureFlagRepository: IFeatureFlagRepository;

  constructor(repo: IFeatureFlagRepository) {
    this.FeatureFlagRepository = repo;
  }

  async execute(input: GetFlagInput): Promise<GetFlagOutput> {
    const id = input.id;

    const result = await this.FeatureFlagRepository.find(id);

    return {
      id: result.id,
      name: result.name,
      description: result.description,
      created_at: result.created_at,
      is_active: result.is_active,
      updated_at: result.updated_at,
    };
  }
}
