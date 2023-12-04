import { faker } from '@faker-js/faker';

import { UserProps } from './User.entity';
import { Uuid } from '../..//shared/domain/uuid';

export class UserFakeFactory {
  static Fake(props?: UserProps) {
    return {
      id: props?.id ?? Uuid.generate_uuidv4(),
      email: props?.email || faker.string.sample(7),
      name: props?.name || faker.string.sample(7),
      password: props?.password ?? faker.string.sample(7),
      created_at: props?.created_at || faker.date.anytime(),
      updated_at: props?.updated_at || faker.date.anytime(),
    };
  }
}
