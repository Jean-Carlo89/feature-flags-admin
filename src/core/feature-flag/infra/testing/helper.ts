import {
  close_connection,
  connect_to_mongoDb,
} from '@core/shared/infra/mongo/config';
import { MongoClient } from 'mongodb';

export function setupMongo() {
  let connection: MongoClient;

  beforeAll(async () => {
    connection = await connect_to_mongoDb('mongodb://localhost:27027/DevDB');
  });

  beforeEach(async () => {
    await connection.db('DevDB').dropDatabase();
  });

  afterAll(async () => await close_connection(connection));

  return connection;
}
