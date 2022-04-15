var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema({
  unique_id: Number,
  firstname: String,
  lastname: String,
  username: String,
  email: String,
  phone: Number,
  plesk: String,
  product: String,
  country: String,
  city: String,
  pincode: String,
  support: Boolean,
  password: String,
  date: {
    type: Date,
    default: Date.now
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'service',
    required: true
  }
});

User = mongoose.model('user', userSchema);

module.exports = User;
