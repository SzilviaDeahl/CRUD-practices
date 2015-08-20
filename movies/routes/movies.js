var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myMovies');
var movieCollection = db.get('movies');

router.get('/movies/index', function (req, res, next) {
  movieCollection.find({}, function (err, movies) {
    res.render('movies/index', {movies: movies})
  });
});

router.get('/movies/new', function (req, res, next) {
  res.render('movies/new')
});

router.post('/movies/create', function (req, res, next) {
  movieCollection.insert(req.body).then(function (movie) {
    res.redirect('/movies/show')
  });
});

router.get('/movies/show', function (req,res, next) {
  movieCollection.find({}, function (err, movies) {
    res.render('movies/show', {movies:movies})
  });
});

module.exports = router;
