var express = require('express');
var router = express.Router();

router.get('/phones/new', function (req, res, next) {
  res.render('phones/new')
});
module.exports = router;
