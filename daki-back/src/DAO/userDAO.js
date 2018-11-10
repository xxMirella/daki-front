const crudDAO = require('./crudDAO');
const User = require('../models/userModel');

class UserDAO extends crudDAO {
  constructor() {
    super(User, _id);
  }
}

module.exports = UserDAO;