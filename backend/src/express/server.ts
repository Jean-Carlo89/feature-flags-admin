import './setup';
import { app } from './app';
import { connect_to_mongoDb } from '../core/shared/infra/mongo/config';

const port = process.env.PORT;
const server = app.listen(port, async () => {
  await connect_to_mongoDb();

  process.on('SIGINT', async () => {
    //await isicMongo.close();
    server.close();
    console.log('Server closed');
  });

  process.on('uncaughtException', (err) => {
    console.error(`An unknown error occurred:
    name: ${err.name},
    message:${err.message}
    stack:${err.stack}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled rejection at ', promise, `reason: ${reason}`);
    process.exit(1);
  });

  console.log(`Listening on ${port}`);
});
