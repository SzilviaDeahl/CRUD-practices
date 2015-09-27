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

module.exports = router;
