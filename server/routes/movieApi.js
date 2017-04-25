const express = require('express');
const router = new express.Router();

const MovieSchema = require('../model/movieSchema.js');

router.post('/addToFav', (req, res, next) => {
	const movieData = {
		Title: req.body.Title.trim(),
		Year: req.body.Year.trim(),
		imdbID: req.body.imdbID.trim(),
		Type: req.body.Type.trim(),
		Poster: req.body.Poster.trim()
	};

	const newMovie = new MovieSchema(movieData);
	newMovie.save((err) => {
		if(err){
			return done(err);
		}
	})

	res.status(200).json({
		message: "Movie added to your Favourite List. Check you favourite list."
	});
});

router.get('/getFavList', (req, res, next) => {
	MovieSchema.find({}, function(err, list){
		if(err){
			res.send(err);
		}else{
			res.send(list);
		}
	});
});

router.delete('/deleteMovie', (req, res, next) => {
	
	if(req.body)
    {
      var movieId = req.body.movieId;
      MovieSchema.remove({_id:movieId},function(err)
      {
        if(err) {
          res.send(err);
        }
        res.status(200).json({
			message: "Movie Deleted Successfully."
		});
      });
    }
});

module.exports = router;