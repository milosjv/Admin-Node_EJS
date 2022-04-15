var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var upload = require('express-fileupload');

const TWO_HOURS = 1000 * 60 * 60 * 2;

const {
  NODE_ENV = 'development',
  SESS_NAME = 'sid',
  SESS_SECRET = 'bamboo<>?',
  SESS_LIFETIME = TWO_HOURS
} = process.env;

const IN_PROD = NODE_ENV === 'production';

mongoose.connect(
  'mongodb+srv://blue_bamboo:bamboo123@mukuldb-sxwa3.mongodb.net/bamboo_table?retryWrites=true&w=majority'
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});

// var flash = require('req-flash');
// app.use(flash());

// app.use(
//   session({
//     secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
//     resave: false,
//     saveUninitialized: true
//   })
// );

// app.use(
//   require('express-session')({
//     secret: 'The milk would do that',
//     resave: true,
//     saveUninitialized: true
//   })
// );

// var flash = require('connect-flash');
// app.use(flash());

// app.use(function(req, res, next) {
//   res.locals.message = req.flash();
//   next();
// });

app.use(
  session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD
    },
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

// Expose all static resources in /public for a year
app.use(
  express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

var index = require('./routes/index');
app.use('/', (req, res) => {
  res.send('sadf');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// file upload
app.use(upload());

// listen on port 3000
app.listen(3002, function() {
  console.log('Express app listening on port 3002');
});
