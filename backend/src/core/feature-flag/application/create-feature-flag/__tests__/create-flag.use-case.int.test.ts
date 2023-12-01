import { FeatureFlagMongoRepository } from '../../../../feature-flag/infra/mongo/feature-flag-mongo.repository';
import { CreateFeatureFlagUseCase } from '../create-flag.use-case';
import {
  close_connection,
  connect_to_mongoDb,
} from '../../../../shared/infra/mongo/config';
import { MongoClient } from 'mongodb';
import { FeatureFlag } from '../../../../feature-flag/domain/FeatureFlag.entity';
import { setupMongo } from '../../../../feature-flag/infra/testing/helper';
import { IFeatureFlagRepository } from '../../../../feature-flag/domain/FeatureFlag.repository';

setupMongo();

describe('Create FeatureFlag Use Case Integration tests', () => {
  let useCase: CreateFeatureFlagUseCase;

  let repository: IFeatureFlagRepository;

  beforeEach(() => {
    repository = new FeatureFlagMongoRepository();
    useCase = new CreateFeatureFlagUseCase(repository);
  });
  it('testff', async () => {
    const props = FeatureFlag.fake();

    //  const flag = new FeatureFlag(props);

    await useCase.execute(props);
  });
});
