var express = require('express');
var router = express.Router();
var requireLogin = require('./users');
router.get('/', function(req, res, next){
    res.render('index.html');
});

router.get('/employees', function(req, res, next){
    res.render('index.html');
});

router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

module.exports = router;