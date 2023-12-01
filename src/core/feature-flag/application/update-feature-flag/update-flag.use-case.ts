import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';
import { FeatureFlag } from '../../../feature-flag/domain/FeatureFlag.entity';
import { IFeatureFlagRepository } from '../../../feature-flag/domain/FeatureFlag.repository';
import { IUseCase } from '../../../shared/application/use-case.interface';

export type UpdateFlagInput = {
  id: string;
  name?: string;
  description?: string;
  created_at?: Date;
  is_active?: boolean;
  updated_at?: Date;
};

export type UpdateFlagOutput = {
  id: string;
  name?: string;
  description?: string;
  created_at?: Date;
  // updated_at: Date;
  is_active?: boolean;
};

export class UpdateFeatureFlagUseCase
  implements IUseCase<UpdateFlagInput, UpdateFlagOutput>
{
  private FeatureFlagRepository: IFeatureFlagRepository;

  constructor(repo: IFeatureFlagRepository) {
    this.FeatureFlagRepository = repo;
  }

  async execute(input: UpdateFlagInput): Promise<UpdateFlagOutput> {
    const flag = await this.FeatureFlagRepository.find(input.id);

    if (!flag) {
      throw new NotFoundError(input.id, FeatureFlag);
    }

    if (input.name) {
      flag.change_name(input.name);
    }

    //*** Description can be null */
    if ('description' in input) {
      flag.change_description(input.description);
    }

    //*** Description can be null */
    if ('is_active' in input) {
      if (input.is_active === true) {
        flag.activate();
      }

      if (input.is_active === false) {
        flag.deactivate();
      }
    }

    flag.updated_at = new Date();

    await this.FeatureFlagRepository.update(flag);

    return {
      id: flag.id,
      name: flag.name,
      description: flag.description,
      created_at: flag.created_at,
      is_active: flag.is_active,
      // updated_at: result.updated_at,
    };
  }
}
