var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myPeople');
var peopleCollection = db.get('people');

router.get('/people/index', function (req, res, next) {
  peopleCollection.find({}, function (err, people) {
    res.render('people/index', {people: people})
  })
})

module.exports = router;
