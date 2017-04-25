const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

/*
  Return the Passport Local Strategy object.
 */

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallBack: true
}, (email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim()
  };
  // Find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
    if(err) { 
      return done(err);
    }
    if(!user){
      const error = new Error('Incorrect Email or Password');
      error.name = 'IncorrectCredentialsError';

      return done(error);
    }

    // Check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordError, isMatch) => {
      if(err){
        return done(err);
      }

      if(!isMatch){
        const error = new Error('Incorrect Email or Password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      }

      const payload = {
        sub: user._id
      };

      // Create a token string
      const token = jwt.sign(payload, config.jwtSecret);
      const data = {
        name: user.name
      };

      return done(null, token, data);
    });
  });
});