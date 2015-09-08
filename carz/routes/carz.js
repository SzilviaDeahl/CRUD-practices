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

module.exports = router;
