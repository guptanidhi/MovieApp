var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
	Title : String,
    Year  : String,
    imdbID : String,
    Type : String,
    Poster : String
});

var FavMovie = mongoose.model("myMovieSchema", movieSchema);

module.exports = FavMovie;