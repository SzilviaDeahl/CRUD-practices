var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myFood');
var foodCollection = db.get('foods');


router.get('/', function (req, res, next) {
  foodCollection.find({}, function (err, foods) {
    res.render('food/index', {foods: foods})
  })
});

router.get('/new', function (req, res, next) {
  res.render('food/new')
});

router.post('/create', function (req, res, next) {
  foodCollection.insert(req.body).then(function (food) {
    res.redirect('/food/show')
  })
});

router.get('/show', function (req, res, next) {
  foodCollection.find({}, function (error, foods) {
    res.render('food/show', {foods: foods})
  })
});

router.get('/:id/edit', function (req, res, next) {
  foodCollection.findOne({_id: req.params.id}, function (err, food) {
    res.render('food/edit', {food: food})
  })
});

router.post('/:id/update', function (req, res, next) {
  foodCollection.update({_id: req.params.id}, req.body).then(function (food) {
    res.redirect('/food/index')
  })
});

router.post('/:id/delete', function (req, res, next) {
  foodCollection.delete({_id: req.params.id}, req.body).then(function (food) {
    res.redirect('/food/index')
  })
});

module.exports = router;
