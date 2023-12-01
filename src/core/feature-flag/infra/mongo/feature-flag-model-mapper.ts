import { FeatureFlag } from '../../../feature-flag/domain/FeatureFlag.entity';
import { FeatureFlagModel } from './feature-flag.model';
export class FeatureFlagModelMapper {
  static toModel(entity: FeatureFlag): Omit<FeatureFlagModel, '_id'> {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }

  static toEntity(model: FeatureFlagModel): FeatureFlag {
    const flag = new FeatureFlag({ ...model });

    return flag;
  }
}
