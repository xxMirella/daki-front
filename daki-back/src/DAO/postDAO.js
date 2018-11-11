const crudDAO = require('./crudDAO');
const postModel = require('../models/postModel');

class PostDAO extends crudDAO {
  constructor() {
    super(postModel, '_id');
  }
}

module.exports = PostDAO;