import * as pg from 'pg';

import dotenv from 'dotenv';
dotenv.config();

if (!process.env.POSTGRES_USERNAME) {
  throw new Error(
    'Environment variable POSTGRES_USERNAME is not set. See https://github.com/YuseiIto/5374-line/blob/develop/README.md'
  );
}

if (!process.env.POSTGRES_HOSTNAME) {
  throw new Error(
    'Environment variable POSTGRES_HOSTNAME is not set. See https://github.com/YuseiIto/5374-line/blob/develop/README.md'
  );
}

if (!process.env.POSTGRES_DBNAME) {
  throw new Error(
    'Environment variable POSTGRES_DBNAME is not set. See https://github.com/YuseiIto/5374-line/blob/develop/README.md'
  );
}

if (!process.env.POSTGRES_PASSWORD) {
  throw new Error(
    'Environment variable POSTGRES_PASSWORD is not set. See https://github.com/YuseiIto/5374-line/blob/develop/README.md'
  );
}

const client = new pg.Client({
  user: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_HOSTNAME,
  database: process.env.POSTGRES_DBNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});
client.connect();

export default client;
