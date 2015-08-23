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
    res.redirect('/airplanes/show')
  });
});

router.get('/airplanes/show', function (req, res, next) {
  planesCollection.find({}, function (err, planes) {
    res.render('airplanes/show', {planes: planes})
  });
});

router.get('/airplanes/:id/edit', function (req, res, next) {
  planesCollection.findOne({_id: req.params.id}, function (err, plane) {
    res.render('airplanes/edit', {plane: plane})
  });
});

router.post('/airplanes/:id/update', function (req, res, next) {
  planesCollection.update({_id: req.params.id}, req.body).then(function (plane) {
    res.redirect('/airplanes/index')
  });
});

module.exports = router;
