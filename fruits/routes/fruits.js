var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myFruits');
var fruitCollection = db.get('fruits');

router.get('/fruits/index', function (req, res, next) {
  fruitCollection.find({}, function (err, fruits) {
    res.render('fruits/index', {fruits: fruits})
  });
});

router.get('/fruits/new', function (req, res, next) {
  res.render('fruits/new')
});

router.post('/fruits/create', function (req, res, next) {
  fruitCollection.insert(req.body).then(function (fruit) {
    res.redirect('/fruits/show')
  });
});

router.get('/fruits/show', function (req, res, next) {
  fruitCollection.find({}, function (err, fruits) {
    res.render('fruits/show', {fruits: fruits})
  });
});

router.get('/fruits/:id/edit', function (req, res, next) {
  fruitCollection.findOne({_id: req.params.id}, function (err, fruit) {
    res.render('fruits/edit', {fruit: fruit})
  });
});

router.post('/fruits/:id/update', function (req, res, next) {
  fruitCollection.update({_id: req.params.id}, req.body).then(function (fruit) {
    res.redirect('/fruits/index')
  });
});

router.post('/fruits/:id/delete', function (req, res, next) {
  fruitCollection.remove({_id: req.params.id}, req.body).then(function (fruit) {
    res.redirect('/fruits/index')
  });
});

module.exports = router;
