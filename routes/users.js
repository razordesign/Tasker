var express = require('express');
var router = express.Router();
var mongoose = require('./conn');

//schema definition
var userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
var User = mongoose.model('users', userSchema);

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
        res.writeHead(201, { 'Location': '/employees', 'uid': user._id });
        res.end();
      }
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.session.reset();
  res.redirect('/');
});


module.exports = {
  router: router,
  User: User
}