import { FeatureFlagMongoRepository } from '../../../../feature-flag/infra/mongo/feature-flag-mongo.repository';
import { GetFeatureFlagUseCase } from '../get-flag.use-case';
import {
  close_connection,
  connect_to_mongoDb,
} from '../../../../shared/infra/mongo/config';
import { MongoClient } from 'mongodb';
import { FeatureFlag } from '../../../../feature-flag/domain/FeatureFlag.entity';
import { setupMongo } from '../../../../feature-flag/infra/testing/helper';
import { NotFoundError } from '../../../../shared/domain/errors/NotFoundError';

setupMongo();

describe('get FeatureFlag Use Case Integration tests', () => {
  let useCase: GetFeatureFlagUseCase;

  let repository: FeatureFlagMongoRepository;

  beforeEach(() => {
    repository = new FeatureFlagMongoRepository();
    useCase = new GetFeatureFlagUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const id = 'random';
    await expect(() => useCase.execute({ id: id })).rejects.toThrow(
      new NotFoundError(id, FeatureFlag),
    );
  });
  it('should get flag', async () => {
    const props = FeatureFlag.fake();

    const flag = new FeatureFlag(props);

    await repository.insert(flag);

    const get_flag = await useCase.execute({ id: flag.id });

    expect(get_flag).toStrictEqual(flag.toJSON());
  });
});
