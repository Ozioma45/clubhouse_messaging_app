const pool = require("../config/db");

const createUserTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_member BOOLEAN DEFAULT false,
      is_admin BOOLEAN DEFAULT false
    )
  `);
};

module.exports = { createUserTable };
