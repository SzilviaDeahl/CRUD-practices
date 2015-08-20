var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myInfo');
var infoCollection = db.get('info');

router.get('/personal/index', function (req, res, next) {
  infoCollection.find({}, function (err, info) {
    res.render('personal/index', {info: info})
  });
});


module.exports = router;
