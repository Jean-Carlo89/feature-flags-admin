import { FeatureFlagInMemoryRepository } from '../../../../feature-flag/infra/in-memory/flag-in-memory.repository';
import { UpdateFeatureFlagUseCase } from '../update-flag.use-case';
import { NotFoundError } from '../../../../shared/domain/errors/NotFoundError';
import {
  FeatureFlag,
  FeatureFlagProps,
} from '../../../../feature-flag/domain/FeatureFlag.entity';

describe('UpdateFeatureFlag UseCase unit tests', () => {
  let useCase: UpdateFeatureFlagUseCase;
  let repository: FeatureFlagInMemoryRepository;

  beforeEach(() => {
    repository = new FeatureFlagInMemoryRepository();
    useCase = new UpdateFeatureFlagUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    try {
      await useCase.execute({ id: 'fake id', name: 'fake' } as any);
    } catch (e) {
      expect(e.message).toBe('FeatureFlag Not Found using ID fake id');
    }
  });

  it('should update a feature flag', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const props: FeatureFlagProps = {
      name: 'name1',
      is_active: false,
    };
    const entity = new FeatureFlag(props);
    repository.items = [entity];

    let output = await useCase.execute({
      id: entity.id,
      name: 'test',
      is_active: true,
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      // id: entity.id,
      // name: 'test',
      // description: null,
      // is_active: true,
      // created_at: entity.created_at,

      id: entity.id,
      name: 'test',
      description: entity.description,
      is_active: true,
      created_at: entity.created_at,
    });

    // type Arrange = {
    //   input: {
    //     id: string;
    //     name: string;
    //     description?: null | string;
    //     is_active?: boolean;
    //   };
    //   expected: {
    //     id: string;
    //     name: string;
    //     description: null | string;
    //     is_active: boolean;
    //     created_at: Date;
    //   };
    // };
    // const arrange: Arrange[] = [
    //   {
    //     input: {
    //       id: entity.id,
    //       name: 'test',
    //       description: 'some description',
    //     },
    //     expected: {
    //       id: entity.id,
    //       name: 'test',
    //       description: 'some description',
    //       is_active: true,
    //       created_at: entity.created_at,
    //     },
    //   },
    //   {
    //     input: {
    //       id: entity.id,
    //       name: 'test',
    //     },
    //     expected: {
    //       id: entity.id,
    //       name: 'test',
    //       description: 'some description',
    //       is_active: true,
    //       created_at: entity.created_at,
    //     },
    //   },
    //   {
    //     input: {
    //       id: entity.id,
    //       name: 'test',
    //       is_active: false,
    //     },
    //     expected: {
    //       id: entity.id,
    //       name: 'test',
    //       description: 'some description',
    //       is_active: false,
    //       created_at: entity.created_at,
    //     },
    //   },
    //   {
    //     input: {
    //       id: entity.id,
    //       name: 'test',
    //     },
    //     expected: {
    //       id: entity.id,
    //       name: 'test',
    //       description: 'some description',
    //       is_active: false,
    //       created_at: entity.created_at,
    //     },
    //   },
    //   {
    //     input: {
    //       id: entity.id,
    //       name: 'test',
    //       is_active: true,
    //     },
    //     expected: {
    //       id: entity.id,
    //       name: 'test',
    //       description: 'some description',
    //       is_active: true,
    //       created_at: entity.created_at,
    //     },
    //   },
    //   {
    //     input: {
    //       id: entity.id,
    //       name: 'test',
    //       description: 'some description',
    //       is_active: false,
    //     },
    //     expected: {
    //       id: entity.id,
    //       name: 'test',
    //       description: 'some description',
    //       is_active: false,
    //       created_at: entity.created_at,
    //     },
    //   },
    // ];

    // for (const i of arrange) {
    //   output = await useCase.execute({
    //     id: i.input.id,
    //     ...('name' in i.input && { name: i.input.name }),
    //     ...('description' in i.input && { description: i.input.description }),
    //     ...('is_active' in i.input && { is_active: i.input.is_active }),
    //   });
    //   expect(output).toStrictEqual({
    //     id: entity.id,
    //     name: i.expected.name,
    //     description: i.expected.description,
    //     is_active: i.expected.is_active,
    //     created_at: i.expected.created_at,
    //   });
    // }
  });
});
