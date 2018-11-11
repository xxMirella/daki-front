const mongoose = require('mongoose');
const schema = mongoose.Schema;

const LocalModel = new schema({
  cep:          { type: String, required: true },
  street:       { type: String, required: true },
  district:     { type: String, required: true },
  city:         { type: String, required: true },
  country:      { type: String, required: true },
});

module.exports = mongoose.model('Local', LocalModel, 'locals');