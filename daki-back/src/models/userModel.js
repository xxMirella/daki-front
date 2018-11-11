const mongoose = require('mongoose');
const schema = mongoose.Schema;
const LocalSchema = require('./localModel');

const UserModel = new schema({
  profilePhoto: { type: String },
  local:        LocalSchema,
  name:         { type: String, required: true },
  phone:        { type: String },
  birthDay:     { type: Date, required: true },
  email:        { type: String, required: true, index: { unique: true } },
  password:     { type: String, required: true }
});

module.exports = mongoose.model('User', UserModel, 'users');