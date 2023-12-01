import { configDotenv } from 'dotenv';
const envFile = '.env.dev';
configDotenv({
  path: envFile,
});

// const envFile =
//   process.env.NODE_ENV === 'test'
//     ? '.env.test'
//     : process.env.NODE_ENV === 'staging'
//     ? '.env.staging'
//     : '.env';

// dotenv.config();
