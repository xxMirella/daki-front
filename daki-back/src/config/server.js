const hapi = require('hapi');

class ServerHapi {
  constructor() {
    this.server = hapi.server(
      {
        port: 4000,
        host: 'localhost'
      }
    );
  }

  async init() {
    await this.server.start().then((error) => {
      if (error) {
        throw error;
      }
      console.log('Server running at: ' + this.server.info.uri)
    });
  }
}


async function main() {
  const serve = new ServerHapi();
  const result = await serve.init();

}

main();