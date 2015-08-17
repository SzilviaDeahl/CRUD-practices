var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myPhones');
var phonesCollection = db.get('phones');

router.get('/phones', function (req, res, next) {
  phonesCollection.find({}, function (err, phones) {
    console.log(phones);
    res.render('phones/index', {phones: phones})
  });
});

router.get('/phones/new', function (req, res, next) {
  res.render('phones/new')
});

router.post('/phones/create', function (req, res, next) {
  phonesCollection.insert(req.body).then(function (phone) {
    console.log(req.body);
    res.redirect('/phones/show')
  });
});

router.get('/phones/show', function (req, res, next) {
  res.render('phones/show')
});

module.exports = router;
