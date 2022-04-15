var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  return res.render('auth/login');
});

module.exports = router;
