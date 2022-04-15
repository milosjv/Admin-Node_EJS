var mongoose = require('mongoose');
var Schema = mongoose.Schema;

categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('category', categorySchema);
