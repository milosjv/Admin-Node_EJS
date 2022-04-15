var express = require('express');
var router = express.Router();

var flash = require('express-flash-messages');
router.use(flash());

var serviceController = require('../controller/service');

// service list
router.get('/index', serviceController.index);
router.get('/add-service', serviceController.add_service);
router.post('/create-service', serviceController.create_service);
router.get('/edit-service/:service_id', serviceController.edit_service);
router.post('/update-service', serviceController.update_service);
router.get('/delete-service/:service_id', serviceController.delete_service);

// category list
router.get('/category', serviceController.category);
router.get('/add-category', serviceController.add_category);
router.post('/create-category', serviceController.create_category);
router.get('/edit-category/:category_id', serviceController.edit_category);
router.post('/update-category', serviceController.update_category);
router.get('/delete-category/:category_id', serviceController.delete_category);

module.exports = router;
