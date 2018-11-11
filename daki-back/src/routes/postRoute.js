const Joi = require('joi');
const postDAO = require('../DAO/postDAO');
const commentsDAO = require('../DAO/commentsDAO');
const boom = require('boom');
const utils = require('../common/utils');


class PostRoute {

  constructor() {
    this.posts = new postDAO();
    this.comments = new commentsDAO();
  }

  static validatePosts() {
    return {
      user:        utils.validateUserPayload(),
      type:        Joi.string().required(),
      image:       Joi.string(),
      title:       Joi.string().required(),
      userLocal:   Joi.string().required(),
      address:     Joi.string(),
      date:        Joi.date(),
      link:        Joi.string(),
      like:        Joi.boolean(),
      description: Joi.string(),
      createdAt:   Joi.date(),
    }
  }

  post() {
    return {
      method: 'POST',
      path: '/timeline/posts',
      handler: async (req) => {
        return await this.posts.post(req.payload);
      },
      config: {
        auth: false,
        tags: ['api'],
        description: 'Cadastra um novo usuário',
        validate: {
          payload: PostRoute.validatePosts(),
        }
      }
    }
  }

}

module.exports = PostRoute;