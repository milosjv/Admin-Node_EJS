var express = require('express');
var router = express.Router();
var upload = require('express-fileupload');

var ticketController = require('../controller/ticket');

router.use(upload());

// router.get('/add', userController.add);
router.get('/list', ticketController.index);
router.get('/reply/:unique_id', ticketController.reply);
router.post('/post', ticketController.post);

router.get('/download/:file.(*)', ticketController.download);

router.get('/delete/:unique_id', ticketController.delete);

module.exports = router;
