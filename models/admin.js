var mongoose = require('mongoose');
var Schema = mongoose.Schema;

adminSchema = new Schema({
  unique_id: Number,
  username: String,
  password: String,
  date: {
    type: Date,
    default: Date.now
  }
});

Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
