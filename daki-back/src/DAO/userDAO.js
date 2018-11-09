'use strict';
const crudDAO = require('crudDAO');
const user = require('../models/userModel');

class UserDAO extends crudDAO {
  constructor() {
    super(user, _id);
  }
}
