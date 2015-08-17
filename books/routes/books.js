var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myBooks');
var booksCollection = db.get('books');

router.get('/books/index', function (req, res, next) {
  res.render('books/index')
});


module.exports = router;
