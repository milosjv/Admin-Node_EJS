var express = require('express');
var router = express.Router();

var userController = require('../controller/user');

// router.get('/add', userController.add);
router.get('/list', userController.list);
router.get('/add', userController.add);
router.post('/create', userController.create);
router.get('/edit/:user_id', userController.edit);
router.post('/update', userController.update);
router.get('/delete/:user_id', userController.delete);

module.exports = router;
