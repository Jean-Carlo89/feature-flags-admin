import { FeatureFlag } from '../../../feature-flag/domain/FeatureFlag.entity';
import { InMemoryRepository } from '../../../shared/infra/in-memory/in-memory.repository';

export class FeatureFlagInMemoryRepository extends InMemoryRepository<FeatureFlag> {
  getEntity(): new (...args: any[]) => FeatureFlag {
    return FeatureFlag;
  }
}
