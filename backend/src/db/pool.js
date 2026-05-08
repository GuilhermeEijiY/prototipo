const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "casacerta",
});

async function testConnection() {
  await pool.query("SELECT 1");
  console.log("Conexao com PostgreSQL estabelecida com sucesso.");
}

module.exports = {
  pool,
  testConnection,
};
