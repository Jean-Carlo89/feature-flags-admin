import { IRepository } from '../../shared/infra/in-memory/repository-interface';
import { FeatureFlag } from './FeatureFlag.entity';

export interface IFeatureFlagRepository extends IRepository<FeatureFlag> {}
