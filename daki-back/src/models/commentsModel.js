const mongoose = require('mongoose');
const UserSchema = require('./userModel');

let CommentsSchema = mongoose.Schema({
  user:        UserSchema,
  text:        { type: String, required: true },
  publishedAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Comment', CommentsSchema, 'comments');