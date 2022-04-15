var mongoose = require('mongoose');
var Schema = mongoose.Schema;

serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  // category: {
  //   type: String,
  //   required: true
  // },
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: true
  },
  subscription_period: {
    type: Number,
    required: true
  },
  assign_users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  ],
  service_ip: {
    type: String,
    required: true
  },
  service_user: {
    type: String,
    required: true
  },
  service_password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('service', serviceSchema);
