import { FeatureFlagMongoRepository } from '../../../../feature-flag/infra/mongo/feature-flag-mongo.repository';
import { CreateFeatureFlagUseCase } from '../create-flag.use-case';
import {
  close_connection,
  connect_to_mongoDb,
} from '../../../../shared/infra/mongo/config';
import { MongoClient } from 'mongodb';
import { FeatureFlag } from '../../../../feature-flag/domain/FeatureFlag.entity';
import { setupMongo } from '@core/feature-flag/infra/testing/helper';

setupMongo();

//let connection: MongoClient;
// beforeAll(async () => {
//   connection = await connect_to_mongoDb('mongodb://localhost:27027');
// });

// beforeEach(async () => {
//   await connection.db('DevDB').dropDatabase();
// });

// afterAll(async () => {
//   //await connection.db("IsicDevLocalTesting").dropDatabase();
//   await close_connection(connection);
// });

describe('Create FeatureFlag Use Case Integration tests', () => {
  let useCase: CreateFeatureFlagUseCase;

  let repository: FeatureFlagMongoRepository;

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
