var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myBooks');
var booksCollection = db.get('books');

router.get('/books/index', function (req, res, next) {
  booksCollection.find({}, function (err, books) {
    res.render('books/index', {books: books})
  });
});

router.get('/books/new', function (req, res, next) {
  res.render('books/new')
});

router.post('/books/create', function (req, res, next) {
  booksCollection.insert(req.body).then(function (book) {
    res.redirect('/books/show')
  });
});




module.exports = router;
