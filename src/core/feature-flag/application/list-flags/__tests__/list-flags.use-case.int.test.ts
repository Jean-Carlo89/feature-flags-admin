import { FeatureFlagMongoRepository } from '../../../../feature-flag/infra/mongo/feature-flag-mongo.repository';
import {
  FeatureFlag,
  FeatureFlagProps,
} from '../../../domain/FeatureFlag.entity';
import { FeatureFlagInMemoryRepository } from '../../../infra/in-memory/flag-in-memory.repository';
import { ListFeatureFlagsUseCase } from '../list-flags.use-case';
import { setupMongo } from '../../../../feature-flag/infra/testing/helper';
import exp from 'constants';

setupMongo();

describe('ListFeatureFlagUseCase Unit tests', () => {
  let useCase: ListFeatureFlagsUseCase;

  let repository: FeatureFlagMongoRepository;

  let date: Date;

  beforeEach(() => {
    repository = new FeatureFlagMongoRepository();
    useCase = new ListFeatureFlagsUseCase(repository);
    date = new Date();
  });

  it('Should list feature flags', async () => {
    let flags: FeatureFlag[] = [];

    for (let i = 0; i < 30; i++) {
      const props = FeatureFlag.fake({ id: `${i + 1}` } as any);
      const flag = new FeatureFlag(props);

      flags.push(flag);
    }

    await repository.insertMany(flags);

    let result = await useCase.execute();

    expect(result).toHaveLength(20);

    const arrange = [
      {
        input: { per_page: 10, index: 5 },
        expected: { length: 10, id: '6' },
      },

      {
        input: { per_page: 25, index: 24 },
        expected: { length: 6, id: '25' },
      },
    ];

    for (let i = 0; i < arrange.length; i++) {
      const current = arrange[i];
      result = await useCase.execute(current.input);

      expect(result).toHaveLength(current.expected.length);

      expect(result[0].id).toStrictEqual(current.expected.id);
    }
  });
});
