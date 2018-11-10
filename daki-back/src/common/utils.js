const Joi = require('joi');

class Utils {

  static validateHeaders() {
    return Joi.object({
      authorization: Joi.string().required(),
    }).unknown();
  }

}

module.exports = Utils;