const hapi = require('hapi');
const boom = require('boom');

class ServerHapi {

  constructor(port, host) {
    this.server = hapi.server(
      {
        port: port,
        host: host
      }
    );
  }

  async init() {
    await this.server.start()
      .then((error) => {
        if (error) {
          return boom.internal();
        }
        console.log('Server running at: ' + this.server.info.uri)
    });
  }
}

module.exports = ServerHapi;