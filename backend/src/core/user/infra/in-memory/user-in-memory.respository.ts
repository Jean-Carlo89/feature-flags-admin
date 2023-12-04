import { User } from '../../../user/domain/User.entity';
import { InMemoryRepository } from '../../../shared/infra/in-memory/in-memory.repository';

export class UserInMemoryRepository extends InMemoryRepository<User> {
  getEntity(): new (...args: any[]) => User {
    return User;
  }
}
