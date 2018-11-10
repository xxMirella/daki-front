'use strict';
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserModel = new schema({
  profilePhoto: { type: String },
  district:     { type: String, required: true },
  name:         { type: String, required: true },
  birthDay:     { type: Date, required: true },
  email:        { type: String, required: true, index: { unique: true } },
  password:     { type: String, required: true }
});

module.exports = mongoose.model('User', UserModel, 'users');