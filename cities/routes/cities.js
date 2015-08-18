var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myCities');
var citiesCollection = db.get('cities');


router.get('/cities/index', function (req, res, next) {
  citiesCollection.find({}, function (err, cities) {
    res.render('cities/index', {cities: cities})
  });
});

router.get('/cities/new', function (req, res, next) {
  res.render('cities/new')
});

router.post('/cities/create', function (req, res, next) {
  citiesCollection.insert(req.body).then(function (city) {
    res.redirect('/cities/show')
  });
});

router.get('/cities/show', function (req, res, next) {
  citiesCollection.find({}, function (err, cities) {
    res.render('cities/show', {cities: cities})
  });
});

router.get('/cities/:id/edit', function (req, res, next) {
  citiesCollection.findOne({_id: req.params.id}, function (err, city) {
    res.render('cities/edit', {city: city})
  });
});

router.post('/cities/:id/update', function (req, res, next) {
  citiesCollection.update({_id:req.params.id}, req.body).then(function (city) {
    res.redirect('/cities/index')
  });
});

router.post('/cities/:id/delete', function (req, res, next) {
  citiesCollection.remove({_id: req.params.id}, req.body).then(function (city) {
    res.redirect('/cities/index')
  });
});

module.exports = router;
