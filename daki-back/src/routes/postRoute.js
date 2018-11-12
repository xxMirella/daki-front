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
      userLocal:   utils.validateLocalPayload(),
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
        try {
          return await this.posts.post(req.payload);
        } catch (error) {
          console.log(error)
        }

      },
      config: {
        tags: ['api'],
        description: 'Cadastra um novo post',
        validate: {
          headers: utils.validateHeaders(),
          failAction: (request, h, err) => {
            throw err;
          },
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
        const { limit, ignore } = req.query;
        return await this.posts.list({}, ignore, limit);
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
          query: {
            ignore: Joi.number()
              .integer()
              .default(0),

            limit: Joi.number()
              .integer()
              .default(10),
          },
        },
      },
    }
  };

}

module.exports = PostRoute;