const Joi = require('joi');
const postDAO = require('../DAO/postDAO');
const boom = require('boom');
const utils = require('../common/utils');


class PostRoute {

  constructor() {
    this.posts = new postDAO();
  }

  static validatePosts() {
    return {
      userId:      Joi.string().required(),
      userName:    Joi.string().required(),
      type:        Joi.string().required(),
      image:       Joi.string(),
      title:       Joi.string().required(),
      userLocal:   Joi.string().required(),
      address:     Joi.string(),
      date:        Joi.string(),
      hour:        Joi.string(),
      link:        Joi.string(),
      like:        Joi.boolean(),
      description: Joi.string(),
      createdAt:   Joi.date(),
      contact:     Joi.string(),
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
        tags: ['api'],
        description: 'Cadastra um novo post',
        validate: {
          payload: PostRoute.validatePosts(),
        }
      }
    }
  }

  get() {
    return {
      method: 'GET',
      path: '/timeline/posts',
      handler: async (req, h) => {
        try {
          const { limit, ignore } = req.query;
          return await this.posts.list({}, ignore, limit);
        } catch (err) {
          return Boom.internal();
        }
      },
      config: {
        tags: ['api'],
        description: 'Lista publicacoes paginadas',
        notes: 'Pode paginar, com limte e itens a ignorar',
        validate: {
          headers: utils.validateHeaders(),
          failAction: (request, h, err) => {
            throw err;
          },
        },
        query: {
          ignore: Joi.number()
            .integer()
            .default(0),

            limit: Joi.number()
            .integer()
            .default(10),
        },
      },
    }
  };

}

module.exports = PostRoute;