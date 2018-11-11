const mongoose = require('mongoose');
const AddressSchema = require('./addressModel');

let UserModel = new mongoose.Schema({
  profilePhoto: { type: String },
  address:      AddressSchema,
  name:         { type: String, required: true },
  phone:        { type: String },
  birthDay:     { type: Date, required: true },
  email:        { type: String, required: true, index: { unique: true } },
  password:     { type: String, required: true }
});

module.exports = mongoose.model('User', UserModel, 'users');