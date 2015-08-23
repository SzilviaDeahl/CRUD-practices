var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myAirplanes');
var planesCollection = db.get('planes');

router.get('/airplanes/index', function (req, res, next) {
  planesCollection.find({}, function (err, planes) {
    res.render('airplanes/index', {planes: planes})
  });
});

module.exports = router;
