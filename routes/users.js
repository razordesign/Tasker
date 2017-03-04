var express = require('express');
var router = express.Router();
var mongoose = require('./conn');

//schema definition
var userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
var User = mongoose.model('users', userSchema);


router.get('/checkstatus', function (req, res, next) {
  if (req.session.user) {
    res.writeHead(201, { 'ID': req.session.user._id, 'email': req.session.user.email });
    res.end();
  }
  else {
    res.writeHead(200, { 'Error': 'Login password combination not found' });
    res.end();

  }
});

router.post('/login', function (req, res, next) {
  User.findOne({ email: req.body.login }, function (err, user) {
    if (err) {
      res.send(err);
    }
    if (!user) {
      res.writeHead(200, { 'Error': 'Login password combination not found' });
      res.end();
    } else {
      if (req.body.password === user.password) {
        req.session.user = user;
        res.writeHead(201, { 'email': user.email });
        res.end();
      }
    }
  });
});

router.get('/logout', function (req, res, next) {
  if (req.session.user) {
    req.session.reset();
    res.writeHead(201, { 'Success': 'User successfuly logged out' });
    res.end();
  }
  else {
    res.writeHead(200, { 'Error': 'Could not log out the user' });
    res.end();
  }
});


module.exports = {
  router: router,
  User: User
}