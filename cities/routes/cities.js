var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myCities');
var citiesCollection = db.get('cities');


router.get('/cities/index', function (req, res, next) {
  citiesCollection.find({}, function (err, cities) {
    res.render('cities/index', {cities: cities})
  });
});

module.exports = router;
