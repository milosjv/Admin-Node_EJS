var TicketModel = require('../models/ticket');
var moment = require('moment');

const path = require('path');

module.exports = {
  // list
  index: async (req, res, callback) => {
    tickets = await TicketModel.aggregate([
      { $sort: { unique_id: 1 } },
      {
        $group: {
          _id: { unique_id: '$unique_id' },
          id: { $first: '$_id' },
          subject: { $first: '$subject' },
          unique_id: { $first: '$unique_id' },
          date: { $first: '$date' },
          user: { $first: '$user' },
          status: { $first: '$status' },
          content: { $first: '$content' },
          count: { $sum: 1 }
        }
      }
    ]);
    res.render('ticket/list', { tickets: tickets, moment: moment });
  },
  // delete
  delete: async (req, res, callback) => {
    const { unique_id } = req.params;
    await TicketModel.deleteMany({ unique_id: unique_id });
    res.redirect('/ticket/list');
  },
  // reply
  reply: async (req, res) => {
    tickets = await TicketModel.aggregate([
      { $sort: { unique_id: 1 } },
      {
        $group: {
          _id: { unique_id: '$unique_id' },
          id: { $first: '$_id' },
          subject: { $first: '$subject' },
          unique_id: { $first: '$unique_id' },
          date: { $first: '$date' },
          user: { $first: '$user' },
          status: { $first: '$status' },
          content: { $first: '$content' },
          count: { $sum: 1 }
        }
      }
    ]);
    const { unique_id } = req.params;
    reply_tickets = await TicketModel.find({ unique_id: unique_id });
    res.render('ticket/reply', {
      reply_tickets: reply_tickets,
      tickets: tickets,
      moment: moment,
      unique_id: unique_id
    });
  },
  // post
  post: async (req, res) => {
    const { unique_id } = req.body;

    // file upload
    var file = req.files.filename;
    var filename = file.name;

    file.mv('./upload/' + filename, function(err, callback) {
      if (err) {
        console.log(err);
        res.send('error occured');
      }
    });

    const newTicket = new TicketModel(req.body);
    newTicket.user = 'admin';
    newTicket.type = 1;
    newTicket.attr = filename;

    await newTicket.save();
    await TicketModel.updateMany(
      { unique_id: unique_id },
      { status: newTicket.status }
    );
    console.log('new', newTicket);
    res.redirect('/ticket/reply/' + unique_id);
  },
  download: async (req, res) => {
    console.log('sdf');
    var file = req.params.file;
    var fileLocation = path.join('./upload', file);
    console.log(fileLocation);
    res.download(fileLocation, file);
  }
};
