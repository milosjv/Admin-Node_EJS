var passwordHash = require('password-hash');

var TicketModel = require('../models/ticket');
var ServiceModel = require('../models/service');
var CategoryModel = require('../models/category');
var UserModel = require('../models/user');

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

    const services = await ServiceModel.find({})
      .populate('category')
      .populate('assign_users')
      .exec();

    res.render('service/service', {
      tickets: tickets,
      moment: moment,
      services: services
    });
  },
  //add
  add_service: async (req, res) => {
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

    const categories = await CategoryModel.find({});
    const users = await UserModel.find({});
    res.render('service/add-service', {
      tickets: tickets,
      moment: moment,
      categories: categories,
      users: users,
      service: null
    });
  },

  //create service
  create_service: async (req, res) => {
    console.log('reqbiody', req.body);
    const newService = new ServiceModel(req.body);
    newService.password = passwordHash.generate(newService.service_password);
    await newService.save();
    res.redirect('/service/service');
  },
  // delete
  delete_service: async (req, res, callback) => {
    await ServiceModel.findByIdAndRemove(req.params.service_id);
    res.redirect('/service/index');
  },
  // edit
  edit_service: async (req, res) => {
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
    const categories = await CategoryModel.find({});
    const users = await UserModel.find({});

    ServiceModel.findById(req.params.service_id)
      .populate('category')
      .exec((err, data) => {
        if (err || !data) {
          res.redirect('/service/index');
        }
        return res.render('service/add-service', {
          tickets: tickets,
          moment: moment,
          categories: categories,
          users: users,
          service: data
        });
      });
  },

  //update
  update_service: async (req, res) => {
    const {
      name,
      category,
      start_date,
      end_date,
      price,
      subscription_period,
      assign_users,
      service_ip,
      service_user,
      service_password
    } = req.body;
    const updateService = new ServiceModel(req.body);
    await ServiceModel.findByIdAndUpdate(req.body.service_id, {
      name: name,
      category: category,
      start_date: start_date,
      end_date: end_date,
      price: price,
      subscription_period: subscription_period,
      assign_users: assign_users,
      service_ip: service_ip,
      service_user: service_user,
      service_password: service_password
    });
    res.redirect('/service/index');
  },

  // list
  category: async (req, res, callback) => {
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

    const categories = await CategoryModel.find({});
    res.render('service/category', {
      tickets: tickets,
      moment: moment,
      categories: categories
    });
  },
  add_category: async (req, res) => {
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
    category = null;
    res.render('service/add-category', {
      tickets: tickets,
      moment: moment,
      category: category
    });
  },
  create_category: async (req, res) => {
    console.log('create', req.body);
    const newCategory = new CategoryModel(req.body);
    await newCategory.save();

    req.flash('notify', 'This is a test notification.');
    res.redirect('back');
  },
  delete_category: async (req, res) => {
    await CategoryModel.findByIdAndRemove(req.params.category_id);
    res.redirect('back');
  },
  edit_category: async (req, res) => {
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
    category = await CategoryModel.findById(req.params.category_id);
    res.render('service/add-category', {
      tickets: tickets,
      moment: moment,
      category: category
    });
  },

  update_category: async (req, res) => {
    await CategoryModel.findByIdAndUpdate(req.body._id, {
      name: req.body.name,
      location: req.body.location,
      type: req.body.type
    });
    res.redirect('category');
  }
};
