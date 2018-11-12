const Joi = require('joi');
const userDao = require('../DAO/userDAO');
const postDao = require('../DAO/postDAO');
const utils = require('../common/utils');
const boom = require('boom');


class UserPostsRoute {

  constructor() {
    this.userDao = new userDao();
    this.postsDAO = new postDao();
  }

  static validatePosts() {
    return {
      userId: Joi.string().required(),
      postId: Joi.string().required()
    }
  };

  async validateExistingPostAndUser(userId, postId) {
    const post = await this.postsDAO.get({_id: postId});
    const user = await this.userDao.get({_id: userId});
    if (post.length <= 0 || user.length <=0){
      return boom.notFound('Post ou usuário não encontrados!');
    } else {
      return this.userDao.update(userId, {favPostsID: postId});
    }
  };

  postUserFavPosts() {
    return {
      method: 'POST',
      path: '/user/fav/posts',
      handler: async (req) => {
        const { userId, postId } = req.payload;
        return await this.validateExistingPostAndUser(userId, {favPostsID: postId});
      },
      config: {
        auth: false,
        tags: ['api'],
        description: 'Deve adicionar um post aos favoritos do usuário',
        validate: {
          payload: UserPostsRoute.validatePosts(),
        }
      }
    }
  };

  getUserFavPosts() {
    return {
      method: 'GET',
      path: '/user/fav/posts/{userId}',
      handler: async (req) => {
        const { userId } = req.params;
        try {
          return await this.userDao.getFavPosts({_id: userId});
        } catch (e) {
          console.log(e);
        }

      },
      config: {
        tags: ['api'],
        description: 'Retorna os posts favoritos do usuário',
        notes: 'Necessário passar o id do usuário',
        validate: {
          headers: utils.validateHeaders(),
          params: {
            userId: Joi.string()
              .max(200)
              .required(),
          },
        },
      },
    };
  };
}

module.exports = UserPostsRoute;