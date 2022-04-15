var express = require('express');
var router = express.Router();

var authController = require('../controller/auth');

router.get('/', authController.loginPage);

router.post('/', authController.login);

module.exports = router;
