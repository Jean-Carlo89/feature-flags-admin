import { NotFoundError } from '../../../shared/domain/errors/NotFoundError';
import { User } from '../../../user/domain/User.entity';
import { IUserRepository } from '../../../user/domain/User.repository';
import { IUseCase } from '../../../shared/application/use-case.interface';

export type GetUserInput = {
  id?: string;
};

export type GetUserOutput = {
  name: any;
  id?: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at: Date;
};

export class GetUserUseCase implements IUseCase<GetUserInput, GetUserOutput> {
  private UserRepository: IUserRepository;

  constructor(repo: IUserRepository) {
    this.UserRepository = repo;
  }

  async execute(input: GetUserInput): Promise<GetUserOutput> {
    const id = input.id;

    const result = await this.UserRepository.find(id);

    if (!result) {
      throw new NotFoundError(input.id, User);
    }

    return {
      id: result.id,
      email: result.email,
      password: result.password,
      name: result.name,
      created_at: result.created_at,
      updated_at: result.updated_at,
    };
  }
}
