var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/myMovies');
var movieCollection = db.get('movies');

router.get('/movies/index', function (req, res, next) {
  movieCollection.find({}, function (err, movies) {
    res.render('movies/index', {movies: movies})
  });
});

module.exports = router;
