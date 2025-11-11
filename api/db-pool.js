const { Pool } = require('pg');
require('dotenv').config();

// DIAGNÓSTICO FINAL:
console.log('[db-pool.js] DATABASE_URL LIDA:', process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

module.exports = pool;