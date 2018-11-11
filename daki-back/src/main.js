const databaseMongo = require('./config/database');
const serverHapi = require('./config/server');
const config = require('./config/config');
const Auth = require('./routes/authRoute');
const Post = require('./routes/postRoute');

async function main() {
  const auth = new Auth();
  const posts = new Post();
  const db = new databaseMongo(config.dbConfig.HOST);
  await db.connect();

  const server = new serverHapi(
    config.serverConfig.PORT,
    config.serverConfig.HOST,
    config.TokenKey.key
  );

  const routes = [
    auth.login(),
    auth.signUP(),
    posts.post(),
    posts.get(),
  ];

  await server.init(routes);
}

main();
