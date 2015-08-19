var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myFruits');
var fruitCollection = db.get('fruits ');

router.get('/fruits/index', function (req, res, next) {
  fruitCollection.find({}, function (err, fruits) {
    res.render('fruits/index', {fruits: fruits})
  });
});















module.exports = router;
