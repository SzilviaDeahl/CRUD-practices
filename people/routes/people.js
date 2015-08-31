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

router.get('/people/:id/edit', function (req, res, next) {
  peopleCollection.findOne({_id: req.params.id}, function (err, person) {
    res.render('people/edit', {person: person})
  });
});

router.post('/people/:id/update', function (req, res, next) {
  peopleCollection.update({_id: req.params.id}, req.body).then(function (err, person) {
    res.redirect('/people/index')
  });
});

router.post('/people/:id/delete', function (req, res, next) {
  peopleCollection.remove({_id: req.params.id}, req.body).then(function (err, person) {
    res.redirect('/people/index')
  });
});

module.exports = router;
