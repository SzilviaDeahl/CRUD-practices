var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myComputers');
var compCollections = db.get('computers');

router.get('/computers/index', function (req, res, next) {
  compCollections.find({}, function (err, computers) {
    res.render('computers/index', {computers: computers})
  });
});












module.exports = router;
