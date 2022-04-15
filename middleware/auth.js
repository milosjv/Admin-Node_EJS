const Admin = require('../models/admin');
var session = require('express-session');

const authmiddleware = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = authmiddleware;
