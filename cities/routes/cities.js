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
    res.redirect('/cities/index')
  });
});

module.exports = router;
