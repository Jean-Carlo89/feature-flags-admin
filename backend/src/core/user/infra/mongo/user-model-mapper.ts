import { User } from '../../../user/domain/User.entity';
import { FeatureFlag } from '../../../feature-flag/domain/FeatureFlag.entity';

import { UserModel } from './user.model';
export class UserModelMapper {
  static toModel(entity: User): Omit<UserModel, '_id'> {
    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      password: entity.password,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }

  static toEntity(model: UserModel): User {
    const flag = new User({ ...model });

    return flag;
  }
}
