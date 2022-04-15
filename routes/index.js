var express = require('express');
var app = express();

// var router = express.Router();
// var User = require('../models/user');
var registerRouter = require('./register');
var loginRouter = require('./login');
var dashboardRouter = require('./dashboard');
var userRouter = require('./user');
var ticketRouter = require('./ticket');
var serviceRouter = require('./service');

const authmiddleware = require('../middleware/auth');
const hoemmiddleware = require('../middleware/home');

app.get('/home', hoemmiddleware, function(req, res, next) {
  return res.render('auth/login');
});

app.use('/register', hoemmiddleware, registerRouter);
app.use('/login', hoemmiddleware, loginRouter);
app.use('/dashboard', authmiddleware, dashboardRouter);
app.use('/users', authmiddleware, userRouter);
app.use('/ticket', authmiddleware, ticketRouter);
app.use('/service', authmiddleware, serviceRouter);

app.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = app;
