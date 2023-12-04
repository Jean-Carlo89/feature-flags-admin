import { IUserRepository } from '../../../user/domain/User.repository';
import { IRepository } from '../../../shared/infra/in-memory/repository-interface';
import { User } from '../../../user/domain/User.entity';
import { MongoRepository } from '../../../shared/infra/mongo/mongo.repository';
import { UserModelMapper } from './user-model-mapper';
import { UserModel } from './user.model';

export class UserMongoRepository
  extends MongoRepository
  implements IUserRepository
{
  constructor() {
    super();
  }

  private _collection_name = 'Users';

  get collection_name(): string {
    return this._collection_name;
  }

  async insert(entity: User): Promise<void> {
    const model_props = UserModelMapper.toModel(entity);
    await super.insert_single(this.collection_name, model_props);
  }

  async insertMany(entities: User[]): Promise<void> {
    const models = entities.map((e) => {
      return UserModelMapper.toModel(e);
    });

    await super.insert_many(this._collection_name, models);
  }
  public async update(entity: User): Promise<void> {
    const updated_data = UserModelMapper.toModel(entity);

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
  async find(entity_id: string): Promise<User> {
    const projection = {};

    const result = await super.find_single_by_id(
      this._collection_name,
      entity_id,
    );

    return result ? UserModelMapper.toEntity(result as UserModel) : null;
  }
  async findAll(per_page: number = 20, index: number = 1): Promise<User[]> {
    if (per_page === 0) {
      per_page++;
    }
    const models = await super.find_all(this.collection_name, index, per_page);

    const entities = models.map((model) => {
      return UserModelMapper.toEntity(model as UserModel);
    });

    return entities;
  }
  getEntity(): new (...args: any[]) => User {
    return User;
  }
}
