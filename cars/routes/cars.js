var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myCars');
var carsCollection = db.get('cars');
console.log(carsCollection);


router.get('/cars', function (req, res, next) {
  carsCollection.find({}, function (err, records) {
    console.log(records)
  res.render('cars/index', {cars: records})
  });
});

router.get('/cars/new', function (req, res, next) {
  res.render('cars/new')
});

router.post('/cars/create', function (req, res, next) {
  carsCollection.insert(req.body).then(function (car) {
    res.redirect('/cars/show')
  });
});

router.get('/cars/show', function (req, res, next) {
  carsCollection.find({}, function (err, records) {
    res.render('cars/show', {cars: records})
  });
});

router.get('/cars/:id/edit', function (req, res, next) {
  carsCollection.findOne({_id: req.params.id}, function (err, record) {
    res.render('cars/edit', {car: record})
  });
});

router.post('/cars/:id/update', function (req, res, next) {
  carsCollection.update({_id: req.params.id}, req.body).then(function (car) {
    res.redirect('/cars/show')
  });
});

router.post('/cars/:id/delete', function (req, res, next) {
  carsCollection.remove({_id: req.params.id}, req.body).then(function (car) {
    res.redirect('/cars')
  });
});


module.exports = router;
