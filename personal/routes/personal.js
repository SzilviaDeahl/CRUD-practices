var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myInfo');
var infoCollection = db.get('info');

router.get('/personal/index', function (req, res, next) {
  infoCollection.find({}, function (err, info) {
    res.render('personal/index', {info: info})
  });
});

router.get('/personal/new', function (req, res, next) {
  res.render('personal/new')
});

router.post('/personal/create', function (req, res, next) {
  infoCollection.insert(req.body).then(function (inf) {
    res.redirect('/personal/show', {inf: inf})
  });
});

router.get('/personal/show', function (req, res, next) {
  infoCollection.find({}, function (err, info) {
    res.render('personal/show', {info: info})
  });
});

router.get('/personal/:id/edit', function (req, res, next) {
  infoCollection.findOne({_id: req.params.id}, function (err, inf) {
    res.render('personal/edit', {inf:inf})
  });
});

router.post('/personal/:id/update', function (req, res, next) {
  infoCollection.update({_id: req.params.id}, req.body).then(function (inf) {
    res.redirect('/personal/index')
  });
});

router.post('/personal/:id/delete', function (req, res, next) {
  infoCollection.remove({_id: req.params.id}, req.body).then(function (inf) {
    res.redirect('/personal/index')
  });
});

module.exports = router;
