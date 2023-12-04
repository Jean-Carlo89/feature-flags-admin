import { User } from '../../../user/domain/User.entity';
import { IUserRepository } from '../../../user/domain/User.repository';
import { IUseCase } from '../../../shared/application/use-case.interface';
import bcrypt from 'bcrypt';

export type CreateUserInput = {
  id?: string;
  email: string;
  password: string;
  created_at?: Date;
  name: string;
  updated_at?: Date;
};

export type CreateUserOutput = {
  id?: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at: Date;
  name: string;
};

export class CreateUserUseCase
  implements IUseCase<CreateUserInput, CreateUserOutput>
{
  private UserRepository: IUserRepository;

  constructor(repo: IUserRepository) {
    this.UserRepository = repo;
  }

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const hash = this.hash_password(input.password);

    const updated_input = { ...input };

    updated_input.password = hash;

    const entity = User.create(updated_input);

    await this.UserRepository.insert(entity);

    return {
      id: entity.id,
      email: entity.email,
      name: entity.name,
      password: entity.password,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    };
  }

  private hash_password(password: string) {
    return bcrypt.hashSync(password, 12);
  }
}
