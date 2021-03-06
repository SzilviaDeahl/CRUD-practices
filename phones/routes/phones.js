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
  phonesCollection.find({}, function (err, phones) {
    res.render('phones/show', {phones: phones})
  });
});

router.get('/phones/:id/edit', function (req, res, next) {
  phonesCollection.findOne({_id: req.params.id}, function (err, phone) {
    console.log(req.params.id);
    res.render('phones/edit', {phone: phone})
  });
});

router.post('/phones/:id/update', function (req, res, next) {
  phonesCollection.update({_id: req.params.id}, req.body).then(function (phone) {
    res.redirect('/phones')
  });
});

router.post('/phones/:id/delete', function (req, res, next) {
  phonesCollection.remove({_id: req.params.id}, req.body).then(function (phone) {
    res.redirect('/phones')
  });
});

module.exports = router;
