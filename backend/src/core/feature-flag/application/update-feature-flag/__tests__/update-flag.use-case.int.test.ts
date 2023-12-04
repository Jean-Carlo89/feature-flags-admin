import { FeatureFlagMongoRepository } from '../../../../feature-flag/infra/mongo/feature-flag-mongo.repository';
import { UpdateFeatureFlagUseCase } from '../update-flag.use-case';
import {
  close_connection,
  connect_to_mongoDb,
} from '../../../../shared/infra/mongo/config';
import { MongoClient } from 'mongodb';
import { FeatureFlag } from '../../../../feature-flag/domain/FeatureFlag.entity';
import { setupMongo } from '../../../../shared/testing/helper';
import { NotFoundError } from '../../../../shared/domain/errors/NotFoundError';

setupMongo();

describe('Update FeatureFlag Use Case Integration tests', () => {
  let useCase: UpdateFeatureFlagUseCase;

  let repository: FeatureFlagMongoRepository;

  beforeEach(() => {
    repository = new FeatureFlagMongoRepository();
    useCase = new UpdateFeatureFlagUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const id = 'Update-id';
    await expect(() =>
      useCase.execute({
        id: id,
      }),
    ).rejects.toThrow(new NotFoundError(id, FeatureFlag));
  });

  it('should Update a flag', async () => {
    const props = FeatureFlag.fake();
    const flag = new FeatureFlag(props);

    await repository.insert(flag);

    let result = await useCase.execute({
      id: flag.id,
      name: 'test',
      is_active: true,
    });

    expect(result).toStrictEqual({
      id: flag.id,
      name: 'test',
      description: flag.description,
      is_active: true,
      created_at: flag.created_at,
    });

    type Arrange = {
      input: {
        id: string;
        name: string;
        description?: null | string;
        is_active?: boolean;
      };
      expected: {
        id: string;
        name: string;
        description: null | string;
        is_active: boolean;
        created_at: Date;
      };
    };

    const arrange: Arrange[] = [
      {
        input: {
          id: flag.id,
          name: 'test',
          description: 'some description',
        },
        expected: {
          id: flag.id,
          name: 'test',
          description: 'some description',
          is_active: true,
          created_at: flag.created_at,
        },
      },
      {
        input: {
          id: flag.id,
          name: 'test',
        },
        expected: {
          id: flag.id,
          name: 'test',
          description: 'some description',
          is_active: true,
          created_at: flag.created_at,
        },
      },
      {
        input: {
          id: flag.id,
          name: 'test',
          is_active: false,
        },
        expected: {
          id: flag.id,
          name: 'test',
          description: 'some description',
          is_active: false,
          created_at: flag.created_at,
        },
      },
      {
        input: {
          id: flag.id,
          name: 'test',
        },
        expected: {
          id: flag.id,
          name: 'test',
          description: 'some description',
          is_active: false,
          created_at: flag.created_at,
        },
      },
      {
        input: {
          id: flag.id,
          name: 'test',
          is_active: true,
        },
        expected: {
          id: flag.id,
          name: 'test',
          description: 'some description',
          is_active: true,
          created_at: flag.created_at,
        },
      },
      {
        input: {
          id: flag.id,
          name: 'test',
          description: null,
          is_active: false,
        },
        expected: {
          id: flag.id,
          name: 'test',
          description: null,
          is_active: false,
          created_at: flag.created_at,
        },
      },
    ];

    //let index = 0;
    for (const i of arrange) {
      // index++;

      const input = {
        id: i.input.id,
        ...(i.input.name && { name: i.input.name }),
        ...('description' in i.input && { description: i.input.description }),
        ...('is_active' in i.input && { is_active: i.input.is_active }),
      };

      result = await useCase.execute(input);

      const flagUpdated = await repository.find(i.input.id);
      expect(result).toStrictEqual({
        id: flag.id,
        name: i.expected.name,
        description: i.expected.description,
        is_active: i.expected.is_active,
        created_at: flagUpdated.created_at,
      });

      const { updated_at, ...rest } = flagUpdated.toJSON();
      expect(rest).toStrictEqual({
        id: flag.id,
        name: i.expected.name,
        description: i.expected.description,
        is_active: i.expected.is_active,
        created_at: flagUpdated.created_at,
      });
    }
  });
});
