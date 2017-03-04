var express = require('express');
var router = express.Router();
var requireLogin = require('./users');
router.get('/', function (req, res, next) {
    res.render('index.html');
});

router.get('/business', function (req, res, next) {
    res.render('index.html');
});

router.get('/employees', function (req, res, next) {
    res.render('index.html');
});

router.get('/services', function (req, res, next) {
    res.render('index.html');
});

router.get('/login', function (req, res, next) {
    res.render('index.html');
});

module.exports = router;