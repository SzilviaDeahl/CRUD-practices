var express = require('express');
var router = express.Router();

router.get('/carz/index', function (req, res, next) {
  res.render('carz/index')
});

module.exports = router;
