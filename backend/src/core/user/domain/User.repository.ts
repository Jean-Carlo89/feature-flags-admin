import { IRepository } from '../../shared/infra/in-memory/repository-interface';
import { User } from './User.entity';

export interface IUserRepository extends IRepository<User> {}
