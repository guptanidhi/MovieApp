var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username : {type: String, unique: true},
	password : {type: String},
	firstname : String,
	lastname : String
});

var User = mongoose.model("myUser", userSchema);

module.exports = User;