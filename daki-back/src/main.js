const databaseMongo = require('./config/database');
const serverHapi = require('./config/server');
const config = require('./config/config');
const auth = require('./routes/authRoute');

async function main() {
  const db = new databaseMongo(config.dbConfig.HOST);
  await db.connect();

  const server = new serverHapi(
    config.serverConfig.PORT,
    config.serverConfig.HOST,
    config.TokenKey.key
  );

  const routes = [
    auth.login(),
    auth.signUP()
  ];

  await server.init(routes);
}

main();
