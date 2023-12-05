import { MongoClient } from 'mongodb';
let connection: MongoClient;
const connect_to_mongoDb = async (uri?: string): Promise<MongoClient> => {
  const database_uri = uri || process.env.MDB_URI;

  console.log(`Connecting to Database: ${database_uri} .....`);

  const client = new MongoClient(database_uri);

  try {
    connection = await client.connect();

    console.log(`connected to db `);
    // app.locals.mongo_connection = connection;
    process.on('SIGINT', async () => {
      try {
        await connection.close();
        console.log('connection to database closed');
      } catch (e) {
        console.error(e);
      }
    });

    return connection;
  } catch (e) {
    console.log(`Could not connect to database : ${database_uri} `);
    console.error(e);
  }
};

const close_connection = async (connection: MongoClient) => {
  try {
    await connection.close();
  } catch (e) {
    console.error(e);
    console.log('Could not close connection');
  }
};

const get_connection = () => {
  return connection;
};

export { connect_to_mongoDb, close_connection, get_connection };
