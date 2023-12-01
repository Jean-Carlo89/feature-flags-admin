import { FeatureFlag } from '../../../feature-flag/domain/FeatureFlag.entity';
import { IFeatureFlagRepository } from '../../../feature-flag/domain/FeatureFlag.repository';
import { IUseCase } from '../../../shared/application/use-case.interface';

export type CreateFlagInput = {
  id?: string;
  name: string;
  description?: string;
  created_at?: Date;
  is_active: boolean;
  updated_at?: Date;
};

export type CreateFlagOutput = {
  id?: string;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at: Date;
  is_active: boolean;
};

export class CreateFeatureFlagUseCase
  implements IUseCase<CreateFlagInput, CreateFlagOutput>
{
  private FeatureFlagRepository: IFeatureFlagRepository;

  constructor(repo: IFeatureFlagRepository) {
    this.FeatureFlagRepository = repo;
  }

  async execute(input: CreateFlagInput): Promise<CreateFlagOutput> {
    const entity = FeatureFlag.create(input);

    await this.FeatureFlagRepository.insert(entity);

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
      is_active: entity.is_active,
      updated_at: entity.updated_at,
    };
  }
}
