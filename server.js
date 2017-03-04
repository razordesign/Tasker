var express = require('express');
var async = require('async');
var path = require('path');
var bodyParser = require('body-parser');
var sessions = require("client-sessions");
var cors = require('cors');
var index = require('./routes/index');
var employeefile = require('./routes/employees');
var employees = employeefile.router;
var services = require('./routes/services');
var userfile = require('./routes/users');
var users = userfile.router;
var User = userfile.User;
//var User = require('./routes/users');
var port = 3000;
var app = express();

//parallel speedup
function parallel(middlewares) {
  return function (req, res, next) {
    async.each(middlewares, function (mw, cb) {
      mw(req, res, cb);
    }, next);
  };
}

app.use(parallel([
  sessions({
    cookieName: 'session',
    secret: '890132!@#@saldkjasd!@#!@s',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }),
  function (req, res, next) {
    if (req.session && req.session.user) {
      User.findOne({ email: req.session.user.email }, function (err, user) {
        if (user) {
          req.user = user;
          delete req.user.password; // delete the password from the session
          req.session.user = user;  //refresh the session value
          res.locals.user = user;
        }
        // finishing processing the middleware and run the route
        next();
      });
    } else {
      next();
    }
  },
  express.static(path.join(__dirname, 'client')),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false })



]));

//cors config
app.use(cors());

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Middleware sessions
/*
app.use(sessions({
  cookieName: 'session',
  secret: '890132!@#@saldkjasd!@#!@s',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));*/
//Middleware function
/*
app.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (user) {
        req.user = user;
        delete req.user.password; // delete the password from the session
        req.session.user = user;  //refresh the session value
        res.locals.user = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});
*/

// Set Static Folder
//app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', employees);
app.use('/api', services);
app.use('/users', users);

app.listen(port, function () {
  console.log('Server started on port ' + port);
});