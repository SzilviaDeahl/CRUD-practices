var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myAirplanes');
var planesCollection = db.get('planes');

router.get('/airplanes/index', function (req, res, next) {
  planesCollection.find({}, function (err, planes) {
    res.render('airplanes/index', {planes: planes})
  });
});

router.get('/airplanes/new', function (req, res, next) {
  res.render('airplanes/new')
});

router.post('/airplanes/create', function (req, res, next) {
  planesCollection.insert(req.body).then(function (plane) {
    res.redirect('/airplanes/show', {planes: planes})
  });
});

module.exports = router;
