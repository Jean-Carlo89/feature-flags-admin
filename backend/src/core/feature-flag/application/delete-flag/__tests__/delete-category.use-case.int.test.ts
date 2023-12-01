import { FeatureFlagMongoRepository } from '../../../../feature-flag/infra/mongo/feature-flag-mongo.repository';
import { DeleteFeatureFlagUseCase } from '../delete-flag.use-case';
import {
  close_connection,
  connect_to_mongoDb,
} from '../../../../shared/infra/mongo/config';
import { MongoClient } from 'mongodb';
import { FeatureFlag } from '../../../../feature-flag/domain/FeatureFlag.entity';
import { setupMongo } from '../../../../feature-flag/infra/testing/helper';
import { NotFoundError } from '../../../../shared/domain/errors/NotFoundError';

setupMongo();

describe('Delete FeatureFlag Use Case Integration tests', () => {
  let useCase: DeleteFeatureFlagUseCase;

  let repository: FeatureFlagMongoRepository;

  beforeEach(() => {
    repository = new FeatureFlagMongoRepository();
    useCase = new DeleteFeatureFlagUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const id = 'delete-id';
    await expect(() => useCase.execute({ id: id })).rejects.toThrow(
      new NotFoundError(id, FeatureFlag),
    );
  });

  it('should delete a flag', async () => {
    const props = FeatureFlag.fake();

    const flag = new FeatureFlag(props);

    await repository.insert(flag);

    await useCase.execute({ id: flag.id });

    await expect(repository.find(flag.id)).resolves.toBeNull();
  });
});
