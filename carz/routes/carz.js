var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myCarz');
var carzCollections = db.get('carz');


router.get('/carz/index', function (req, res, next) {
  carzCollections.find({}, function (err, carz) {
    res.render('carz/index', {carz: carz})
  });
});

router.get('/carz/new', function (req, res, next) {
  res.render('carz/new')
});

router.post('/carz/create', function (req, res, next) {
  carzCollections.insert(req.body).then(function (car) {
    res.redirect('/carz/show')
  });
});

router.get('/carz/show', function (req, res, next) {
  carzCollections.find({}, function (err, carz) {
    res.render('carz/show', {carz: carz})
  });
});

router.get('/carz/:id/edit', function (req, res, next) {
  carzCollections.findOne({_id: req.params.id}, function (err, car) {
    res.render('carz/edit', {car: car})
  });
});

router.post('/carz/:id/update', function (req, res, next) {
  carzCollections.update({_id: req.params.id}, req.body).then(function (car) {
    res.redirect('/carz/index')
  });
});

router.post('/carz/:id/delete', function (req, res, next) {
  carzCollections.remove({_id: req.params.id}, req.body).then(function (car) {
    res.redirect('/carz/index')
  });
});

module.exports = router;
