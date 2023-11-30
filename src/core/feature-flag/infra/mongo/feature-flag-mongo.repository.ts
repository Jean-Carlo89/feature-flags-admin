import { IFeatureFlagRepository } from '@core/feature-flag/domain/FeatureFlag.repository';
import { IRepository } from '../../../shared/infra/in-memory/repository-interface';
import { FeatureFlag } from '@core/feature-flag/domain/FeatureFlag.entity';
import { MongoRepository } from '@core/shared/infra/mongo/mongo.repository';
import { FeatureFlagModelMapper } from './feature-flag-model-mapper';

export class FeatureFlagMongoRepository
  extends MongoRepository
  implements IFeatureFlagRepository
{
  constructor() {
    super();
  }

  private _collection_name = 'FeatureFlags';

  get collection_name(): string {
    return this._collection_name;
  }

  async insert(entity: FeatureFlag): Promise<void> {
    const model_props = FeatureFlagModelMapper.toModel(entity);
    await super.insert_single(this.collection_name, model_props);
  }
  insertMany(entities: FeatureFlag[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: FeatureFlag): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(entity_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  find(entity_id: string): Promise<FeatureFlag> {
    throw new Error('Method not implemented.');
  }
  findAll(per_page?: number, index?: number): Promise<FeatureFlag[]> {
    throw new Error('Method not implemented.');
  }
  getEntity(): new (...args: any[]) => FeatureFlag {
    throw new Error('Method not implemented.');
  }
}
