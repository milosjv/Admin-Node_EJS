var Admin = require('../models/admin');
var passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
var session = require('express-session');

exports.register = function(req, res, callback) {
  res.render('auth/register');
};

exports.create = function(req, res, next) {
  var personInfo = req.body;

  if (
    !personInfo.username ||
    !personInfo.password ||
    !personInfo.passwordConf
  ) {
    res.redirect('back');
  } else {
    if (personInfo.password == personInfo.passwordConf) {
      Admin.findOne({ username: personInfo.username }, function(err, data) {
        if (!data) {
          var c;
          Admin.findOne({}, function(err, data) {
            if (data) {
              c = data.unique_id + 1;
            } else {
              c = 1;
            }
            console.log('sadf', c);

            var newAdmin = new Admin({
              unique_id: c,
              username: personInfo.username,
              password: passwordHash.generate(personInfo.password)
            });

            newAdmin.save(function(err, Person) {
              if (err) console.log(err);
              else console.log('Success');
            });

            console.log('admin', data);

            req.session.userId = c;
            res.redirect('/dashboard');
          })
            .sort({ _id: -1 })
            .limit(1);

          //   res.send({ Success: 'You are regestered,You can login now.' });
        } else {
          res.redirect('back', { faild: 'username error' });
        }
      });
    } else {
      res.redirect('back', { faild: 'password error' });
    }
  }
};

exports.loginPage = function(req, res, next) {
  return res.render('auth/login');
};

exports.login = function(req, res, next) {
  Admin.findOne({ username: req.body.username }, function(err, data) {
    if (data) {
      if (passwordHash.verify(req.body.password, data.password)) {
        console.log(req.session);
        req.session.userId = data.unique_id;
        res.redirect('/dashboard');
        // res.send({ Success: 'Success!' });
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/');
    }
  });
};
