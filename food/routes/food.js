var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myFood');
var foodCollection = db.get('foods');


router.get('/food/index', function (req, res, next) {
  foodCollection.find({}, function (err, foods) {
    res.render('food/', {foods: foods})
  })
});

router.get('/food/new', function (req, res, next) {
  res.render('food/new')
});

router.post('/food/create', function (req, res, next) {
  foodCollection.insert(req.body).then(function (food) {
    res.redirect('/food/show')
  })
});

router.get('/food/:id/show', function (req, res, next) {
  foodCollection.findOne({_id: req.params.id}, function (error, food) {
    res.render('food/show', {food: food})
  })
});

router.get('/food/:id/edit', function (req, res, next) {
  foodCollection.findOne({_id: req.params.id}, function (err, food) {
    res.render('food/edit', {food: food})
  })
});

router.post('/food/:id/update', function (req, res, next) {
  foodCollection.update(req.body).then(function (food) {
    res.redirect('/food/index')
  })
});

module.exports = router;
