var TicketModel = require('../models/ticket');
var moment = require('moment');

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
    res.render('dashboard', { tickets: tickets, moment: moment });
  }
};
