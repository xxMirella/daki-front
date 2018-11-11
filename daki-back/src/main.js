const databaseMongo = require('./config/database');
const serverHapi = require('./config/server');
const config = require('./config/config');
const Auth = require('./routes/authRoute');

async function main() {
  const auth = new Auth();
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
