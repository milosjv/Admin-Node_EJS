var express = require('express');
var router = express.Router();

var dashboardController = require('../controller/dashboard');

router.get('/', dashboardController.index);

module.exports = router;
