const Joi = require('joi');
const userDao = require('../DAO/userDAO');
const utils = require('../common/utils');
const userManager = require('../manager/userManager');

class AuthRoute {

  constructor() {
    this.userDao = new userDao();
  }

  login() {
    return {
      method: 'POST',
      path: '/auth/login',
      handler: async (req) => {
        const { email, password } = req.payload;
        return userManager.validateUser(email, password);
      },
      config: {
        auth: false,
        tags: ['api'],
        description: 'Deve gerar um token para o usuario',
        validate: {
          payload: {
            email: Joi.string()
              .required(),
            password: Joi.string()
              .max(100)
              .required(),
          }
        }
      }
    }
  }

  signUP() {
    return {
      method: 'POST',
      path: '/auth/signUp',
      handler: async (req) => {
        return await this.userDao.postUser(req.payload);
      },
      config: {
        auth: false,
        tags: ['api'],
        description: 'Cadastra um novo usuário',
        validate: {
          payload: utils.validateUserPayload(),
        }
      }
    }
  }

}

module.exports = AuthRoute;