var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myBooks');
var booksCollection = db.get('books');

router.get('/books', function (req, res, next) {
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

router.get('/books/show', function (req, res, next) {
  booksCollection.find({}, function (err, books) {
    res.render('books/show', {books: books})
  });
});

router.get('/books/:id/edit', function (req, res, next) {
  booksCollection.findOne({_id: req.params.id}, function (err, book) {
    res.render('books/edit', {book: book})
  });
});

router.post('/books/:id/update', function (req, res, next) {
  booksCollection.update({_id: req.params.id}, req.body).then(function (book) {
    res.redirect('/books')
  });
});

router.post('/books/:id/delete', function (req, res, next) {
  booksCollection.remove({_id: req.params.id}, req.body).then(function (book) {
    res.redirect('/books')
  });
});



module.exports = router;
