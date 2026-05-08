require("dotenv").config();

const app = require("./src/app");
const { testConnection } = require("./src/db/pool");
const { initDatabase } = require("./src/db/initDatabase");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await testConnection();
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`CasaCerta API rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao inicializar o servidor:", error.message);
    process.exit(1);
  }
}

startServer();
