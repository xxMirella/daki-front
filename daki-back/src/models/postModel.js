const mongoose = require('mongoose');
const CommentsSchema = require('./commentsModel');
const AddressSchema = require('./addressModel');

const postTypes = [
  'Events',
  'Service',
  'Exchange',
  'Alert'
];

let PostSchema = new mongoose.Schema({
  userId:      { type: ObjectId, required: true },
  userName:    { type: String, required: true },
  type:        postTypes,
  image:       { type: String },
  title:       { type: String, required: true },
  userLocal:   AddressSchema,
  address:     { type: String },
  date:        { type: Date },
  link:        { type: String, required: true },
  like:        { type: Boolean },
  comments:    CommentsSchema,
  description: { type: String, required: true },
  createdAt:   { type: Date, default: Date() }
});

module.exports = mongoose.model('Post', PostSchema, 'posts');