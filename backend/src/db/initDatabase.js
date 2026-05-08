const { pool } = require("./pool");

async function initDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS simulations (
      id SERIAL PRIMARY KEY,
      tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('financiamento', 'consorcio')),
      valor_imovel NUMERIC(14, 2) NOT NULL,
      valor_entrada NUMERIC(14, 2) DEFAULT 0,
      prazo INTEGER NOT NULL,
      taxa NUMERIC(8, 4) NOT NULL,
      resultado_parcela NUMERIC(14, 2),
      resultado_custo_total NUMERIC(14, 2),
      data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await pool.query(createTableQuery);
  console.log('Tabela "simulations" verificada/criada com sucesso.');
}

if (require.main === module) {
  initDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Erro ao criar tabela inicial:", error.message);
      process.exit(1);
    });
}

module.exports = {
  initDatabase,
};
