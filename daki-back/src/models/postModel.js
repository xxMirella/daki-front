const mongoose = require('mongoose');
const CommentsSchema = require('./commentsModel');

const postTypes = [
  'Events',
  'Service',
  'Exchange',
  'Alert'
];

let PostSchema = mongoose.Schema({
  type:         postTypes,
  title:       { type: String, required: true },
  address:     { type: String },
  date:        { type: Date },
  link:        { type: String, required: true },
  like:        { type: Boolean },
  comments:    CommentsSchema,
  description: { type: String, required: true },
  createdAt:   { type: Date, default: Date() }
});

module.exports = mongoose.model('Post', PostSchema, 'posts');