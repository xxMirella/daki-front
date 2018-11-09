const mongoose = require('mongoose');

export class Database {

  constructor(host) {
    this.host = host;
  }

  static connect() {
    mongoose.connect('mongodb://localhost:27017/daki', { useNewUrlParser: true });
    return mongoose.connection;
  }
}
