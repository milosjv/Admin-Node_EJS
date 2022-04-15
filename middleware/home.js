const Admin = require('../models/admin');

var homemiddleware = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

module.exports = homemiddleware;
