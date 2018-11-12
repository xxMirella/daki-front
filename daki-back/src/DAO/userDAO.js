const crudDAO = require('./crudDAO');
const User = require('../models/userModel');
const boom = require('boom');
const utils = require('../common/utils');


class UserDAO extends crudDAO {
  constructor() {
    super(User, '_id');
  }

  async postUser(userData) {
    const exists = await this.get({email: userData.email});
    if (exists.length) {
      return boom.conflict('Email já existe em nossa base!')
    } else {
      const { email } = userData;
      return {
        response: await this.post(userData).then(value => {
          const response = JSON.parse(JSON.stringify(value));
          delete response.password;
          return response;
        }),
        "TokenLogin": utils.createToken(email),
      }
    }
  }

}

module.exports = UserDAO;