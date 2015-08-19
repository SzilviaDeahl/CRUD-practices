var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myComputers');
var compCollections = db.get('computers');

router.get('/computers/index', function (req, res, next) {
  compCollections.find({}, function (err, computers) {
    res.render('computers/index', {computers: computers})
  });
});

router.get('/computers/new', function (req, res, next) {
  res.render('computers/new')
});

router.post('/computers/create', function (req, res, next) {
  compCollections.insert(req.body).then(function (computer) {
    res.redirect('/computers/index')
  });
});












module.exports = router;
