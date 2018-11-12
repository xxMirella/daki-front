const Joi = require('joi');
const Jwt = require('jsonwebtoken');
const config = require('../config/config');
const boom = require('boom');


class Utils {
  
  static validateHeaders() {
    return Joi.object({ authorization: Joi.string().required() }).unknown();
  }

  static validateLocalPayload() {
    return {
      cep:      Joi.string().required(),
      street:   Joi.string().required(),
      district: Joi.string().required(),
      city:     Joi.string().required(),
      country:  Joi.string().required(),
    }
  }

  static validateUserPayload() {
    return {
      profilePhoto: Joi.string(),
      name:         Joi.string().required(),
      birthDay:     Joi.date().required(),
      email:        Joi.string().required(),
      password:     Joi.string().required(),
      phone:        Joi.string(),
      local:        this.validateLocalPayload(),
    };
  }

  static createToken(userEmail) {
    const token = Jwt.sign(
      userEmail,
      config.TokenKey.key
    );
    return { token };
  }

}

module.exports = Utils;