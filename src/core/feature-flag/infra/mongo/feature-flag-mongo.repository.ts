import { IFeatureFlagRepository } from '@core/feature-flag/domain/FeatureFlag.repository';
import { IRepository } from '../../../shared/infra/in-memory/repository-interface';
import { FeatureFlag } from '@core/feature-flag/domain/FeatureFlag.entity';
import { MongoRepository } from '@core/shared/infra/mongo/mongo.repository';
import { FeatureFlagModelMapper } from './feature-flag-model-mapper';
import { FeatureFlagModel } from './feature-flag.model';

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

  async insertMany(entities: FeatureFlag[]): Promise<void> {
    const models = entities.map((e) => {
      return FeatureFlagModelMapper.toModel(e);
    });

    await super.insert_many(this._collection_name, models);
  }
  public async update(entity: FeatureFlag): Promise<void> {
    const updated_data = FeatureFlagModelMapper.toModel(entity);

    const fields = {
      $set: updated_data,
    };

    const result = await super.update_by_id(
      this._collection_name,
      entity.id,
      fields,
    );
  }
  async delete(entity_id: string): Promise<void> {
    const response = await super.delete_by_id(this._collection_name, entity_id);
  }
  async find(entity_id: string): Promise<FeatureFlag> {
    const projection = {};

    const result = await super.find_single_by_id(
      this._collection_name,
      entity_id,
    );

    return result
      ? FeatureFlagModelMapper.toEntity(result as FeatureFlagModel)
      : null;
  }
  async findAll(per_page: number = 20, index?: number): Promise<FeatureFlag[]> {
    const models = await super.find_all(this.collection_name, index, per_page);

    const entities = models.map((model) => {
      return FeatureFlagModelMapper.toEntity(model as FeatureFlagModel);
    });

    return entities;
  }
  getEntity(): new (...args: any[]) => FeatureFlag {
    return FeatureFlag;
  }
}
