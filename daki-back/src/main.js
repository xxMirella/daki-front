const databaseMongo = require('./config/database');
const serverHapi = require('./config/server');
const config = require('./config/config');

async function main() {
  const db = new databaseMongo(config.dbConfig.HOST);
  await db.connect();
  const server = new serverHapi(config.serverConfig.PORT, config.serverConfig.HOST);
  await server.init();
}

main();
