import { configDotenv } from 'dotenv';

console.log(process.env.NODE_ENV);
const envFile = process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test';
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
