import * as pg from "pg";

require('dotenv').config()
const client = new pg.Client({
  user: process.env.POSTGRES_USERNAME,
  host: process.env.POSTGRES_HOSTNAME,
  database: process.env.POSTGRES_DBNAME,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});
client.connect();

export default client;
