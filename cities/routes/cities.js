var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myCities');
var citiesCollection = db.get('cities');


router.get('/cities', function (req, res, next) {
  res.render('index')
});

module.exports = router;
