const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  user: isProduction ? process.env.REMOTE_DB_USER : process.env.LOCAL_DB_USER,
  host: isProduction ? process.env.REMOTE_DB_HOST : process.env.LOCAL_DB_HOST,
  database: isProduction
    ? process.env.REMOTE_DB_NAME
    : process.env.LOCAL_DB_NAME,
  password: isProduction
    ? process.env.REMOTE_DB_PASSWORD
    : process.env.LOCAL_DB_PASSWORD,
  port: isProduction ? process.env.REMOTE_DB_PORT : process.env.LOCAL_DB_PORT,
  ssl: isProduction ? { rejectUnauthorized: false } : false, // Required for Render
});

module.exports = pool;
