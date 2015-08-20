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

router.get('/movies/:id/edit', function (req, res, next) {
  movieCollection.findOne({_id: req.params.id}, function (err, movie) {
    res.render('movies/edit', {movie:movie})
  });
});

router.post('/movies/:id/update', function (req, res, next) {
  movieCollection.update({_id: req.params.id}, req.body).then(function (movie) {
    res.redirect('/movies/index')
  });
});

router.post('/movies/:id/delete', function (req, res, next) {
  movieCollection.remove({_id: req.params.id}, req.body).then(function (movie) {
    res.redirect('/movies/index')
  });
});

module.exports = router;
