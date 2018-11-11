const crudDAO = require('./crudDAO');
const User = require('../models/userModel');
const boom = require('boom');
const utils = require('../common/utils');


class UserDAO extends crudDAO {
  constructor() {
    super(User, '_id');
  }

  postUser(userData) {
    console.log("USERDATA", userData.email);
    const exists = this.get({email: userData.email});
    console.log('EXISTS', exists);
    if (exists) {
      return boom.conflict('Email já existe em nossa base!')
    } else {
      const { email } = userData;
      const response = this.model.create(item);
      const token = utils.createToken(email);

      return {
        response,
        "TokenLogin": token,
      }
    }
  }

}

module.exports = UserDAO;