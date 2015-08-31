var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myPeople');
var peopleCollection = db.get('people');

router.get('/people/index', function (req, res, next) {
  peopleCollection.find({}, function (err, people) {
    res.render('people/index', {people: people})
  });
});

router.get('/people/new', function (req, res, next) {
  res.render('people/new')
});

router.post('/people/create', function (req, res, next) {
  peopleCollection.insert(req.body).then(function (person) {
    res.redirect('/people/show')
  });
});

router.get('/people/show', function (req, res, next) {
  peopleCollection.find({}, function (err, people) {
    res.render('people/show', {people: people})
  });
});

module.exports = router;
