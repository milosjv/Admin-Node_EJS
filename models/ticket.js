var mongoose = require('mongoose');
var Schema = mongoose.Schema;

ticketSchema = new Schema({
  unique_id: Number,
  date: {
    type: Date,
    default: Date.now
  },
  subject: String,
  user: String,
  content: String,
  type: Number, //0:user  1:admin
  attr: String,
  status: String
});

Ticket = mongoose.model('ticket', ticketSchema);

module.exports = Ticket;
