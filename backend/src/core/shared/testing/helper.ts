import { close_connection, connect_to_mongoDb } from '../infra/mongo/config';
import { MongoClient } from 'mongodb';
//import { FeatureFlagMongoRepository } from '../mongo/feature-flag-mongo.repository';

export async function setupMongo() {
  let connection: MongoClient;

  //let feature_flag_database: FeatureFlagMongoRepository;

  beforeAll(async () => {
    connection = await connect_to_mongoDb('mongodb://localhost:27027/DevDB');

    //const feature_flag_database = new FeatureFlagMongoRepository();
  });

  beforeEach(async () => {
    await connection.db('DevDB').dropDatabase();
  });

  afterAll(async () => await close_connection(connection));

  return { connection };
}
