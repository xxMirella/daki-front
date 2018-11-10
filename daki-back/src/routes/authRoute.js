const Jwt = require('jsonwebtoken');
const Joi = require('joi');
const userDao = require('../DAO/userDAO');
const boom = require('boom');

class AuthRoute {

  static login() {
    return {
      method: 'POST',
      path: '/auth/login',
      handler: async (req) => {
        const { email, password } = req.payload;
        if (email.toLowerCase() !== userDao.get(email) || password.toLowerCase() !== userDao.get(password)) {
          return boom.unauthorized('Email ou senha incorreto!');
        }
        return this.createToken(email);
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

  static signUP() {
    return {
      method: 'POST',
      path: '/auth/signUp',
      handler: async (req) => {
        try {
          const user = userDao.post(req.payload);
          return this.createToken(user);
        } catch (error) {
          console.log('Error on post', error);
          return boom.internal();
        }
      },
      config: {
        auth: false,
        tags: ['api'],
        description: 'Cadastra um novo usuário',
        validate: {
          payload: this.validateUserPayload(),
        }
      }
    }
  }

  static validateUserPayload() {
    return {
      profilePhoto: Joi.string(),
      name: Joi.string().required(),
      birthDay: Joi.date().required(),
      district: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    };
  }

  static createToken(userInfo) {
    const token = Jwt.sign(userInfo, JWT_KEY);
    return { token };
  }
}

module.exports = AuthRoute;