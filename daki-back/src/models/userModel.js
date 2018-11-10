'use strict';
const mongoose = require('mongoose');
const media = require('./mediaModel');
const district = require('./districtModel');
const schema = mongoose.Schema;

const UserModel = new schema({
  profilePhoto: media,
  district:     district,
  name:         { type: String, required: true },
  birthDay:     { type: Date, required: true },
  email:        { type: String, required: true, index: { unique: true } },
  password:     { type: String, required: true }
});

module.exports = mongoose.model('User', UserModel, 'users');