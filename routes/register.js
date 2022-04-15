var express = require('express');
var router = express.Router();

var registerController = require('../controller/auth');

// router.get('/add', userController.add);

router.get('/', registerController.register);

router.post('/', registerController.create);

// router.get('/forgetpass', function(req, res, next) {
//   res.render('forget.ejs');
// });

// router.post('/forgetpass', function(req, res, next) {
//   //console.log('req.body');
//   //console.log(req.body);
//   User.findOne({ email: req.body.email }, function(err, data) {
//     console.log(data);
//     if (!data) {
//       res.send({ Success: 'This Email Is not regestered!' });
//     } else {
//       // res.send({"Success":"Success!"});
//       if (req.body.password == req.body.passwordConf) {
//         data.password = req.body.password;
//         data.passwordConf = req.body.passwordConf;

//         data.save(function(err, Person) {
//           if (err) console.log(err);
//           else console.log('Success');
//           res.send({ Success: 'Password changed!' });
//         });
//       } else {
//         res.send({
//           Success: 'Password does not matched! Both Password should be same.'
//         });
//       }
//     }
//   });
// });

module.exports = router;
