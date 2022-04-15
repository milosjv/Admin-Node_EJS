var User = require('../models/user');
var TicketModel = require('../models/ticket');
var moment = require('moment');

exports.add = async function(req, res, callback) {
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
  res.render('users/add-user', {
    tickets: tickets,
    moment: moment
  });
};

exports.create = async function(req, res) {
  try {
    const newUser = new User({
      username: req.param('username'),
      firstname: req.param('firstname'),
      lastname: req.param('lastname'),
      email: req.param('email'),
      phone: req.param('phone'),
      plesk: req.param('plesk'),
      product: req.param('product'),
      country: req.param('country'),
      city: req.param('city'),
      pincode: req.param('pincode'),
      support: req.param('support')
    });

    await newUser.save();
    res.redirect('/users/list');
  } catch (err) {
    console.error(err.message);
    res.redirect('back');
  }
};

exports.edit = async function(req, res) {
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
  let user = await User.findById(req.params.user_id);

  res.render('users/edit-user', {
    user: user,
    tickets: tickets,
    moment: moment
  });
};

exports.update = async function(req, res) {
  await User.findByIdAndUpdate(req.param('user_id'), {
    username: req.param('username'),
    firstname: req.param('firstname'),
    lastname: req.param('lastname'),
    email: req.param('email'),
    phone: req.param('phone'),
    plesk: req.param('plesk'),
    product: req.param('product'),
    country: req.param('country'),
    city: req.param('city'),
    pincode: req.param('pincode'),
    support: req.param('support')
  });

  res.redirect('/users/list');
};

exports.list = async function(req, res, next) {
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
  User.find({}, function(err, data) {
    if (!data) {
      res.redirect('/');
    } else {
      console.log(data);
      return res.render('users/users.ejs', {
        users: data,
        tickets: tickets,
        moment: moment
      });
    }
  });
};

exports.delete = function(req, res) {
  User.findByIdAndRemove(req.params.user_id, function(err) {
    if (err) return res.status(500).json({ error: 'database failure' });
    return res.redirect('/users/list');
  });
};
