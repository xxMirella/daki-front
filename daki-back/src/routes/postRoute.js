const Joi = require('joi');
const postDAO = require('../DAO/postDAO');
const boom = require('boom');
const utils = require('../common/utils');


class PostRoute {

  constructor() {
    this.postsDao = new postDAO();
  }

  static validatePosts() {
    return {
      userId: Joi.string().required(),
      userName: Joi.string().required(),
      type: Joi.string().required(),
      image: Joi.string(),
      title: Joi.string().required(),
      userLocal: utils.validateLocalPayload(),
      address: Joi.string(),
      date: Joi.string(),
      hour: Joi.string(),
      link: Joi.string(),
      like: Joi.boolean().default(false),
      description: Joi.string(),
      createdAt: Joi.date(),
      contact: Joi.string(),
    }
  }

  static validatePostsUpdate() {
    return {
      userId: Joi.string().required(),
      userName: Joi.string().required(),
      type: Joi.string(),
      image: Joi.string(),
      title: Joi.string(),
      userLocal: utils.validateLocalPayload(),
      address: Joi.string(),
      date: Joi.string(),
      hour: Joi.string(),
      link: Joi.string(),
      like: Joi.boolean(),
      description: Joi.string(),
      createdAt: Joi.date(),
      contact: Joi.string(),
    }
  }

  post() {
    return {
      method: 'POST',
      path: '/timeline/posts',
      handler: async (req) => {
        try {
          return await this.postsDao.post(req.payload);
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
  };

  get() {
    return {
      method: 'GET',
      path: '/timeline/posts',
      handler: async (req, h) => {
        const { limit, ignore } = req.query;
        return await this.postsDao.list({}, ignore, limit);
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

  delete() {
    return {
      method: 'DELETE',
      path: '/timeline/posts/{id}',
      handler: async (request, h) => {
        try {
          const {id} = request.params;
          return await this.postsDao.delete(id);
        } catch (err) {
          console.log(err);
        }
      },
      config: {
        tags: ['api'],
        description: 'Remove um post pelo id',
        notes: 'O id deve ser válido',
        validate: {
          headers: utils.validateHeaders(),
          params: {
            id: Joi.string()
              .max(200)
              .required(),
          },
        },
      },
    };
  };

  put() {
    return {
      method: 'PUT',
      path: '/timeline/posts/{id}',
      handler: async (request, h) => {
        try {
          const {id} = request.params;
          return await this.postsDao.update(id, request.payload);
        } catch (err) {
          console.log(err);
        }
      },
      config: {
        tags: ['api'],
        description: 'Atualiza um post pelo id',
        notes: 'O id deve ser válido',
        validate: {
          headers: utils.validateHeaders(),
          params: {
            id: Joi.string()
              .max(200)
              .required(),
          },
          payload: PostRoute.validatePostsUpdate(),
        },
      },
    };
  };

}

module.exports = PostRoute;