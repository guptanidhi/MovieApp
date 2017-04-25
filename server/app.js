const express = require("express");
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('../config');
const path = require('path');

// Connect to the database and load models
require('./model').connect(config.dburl);

// Static files path
const app = express();
app.use(express.static(path.join(__dirname, '../client/public/')));
app.use(express.static(path.join(__dirname, '../client/dist/')));

// app.use(express.static('../client/public/'));
// app.use(express.static('../client/dist/'));

// App to Parse HTTP Body Messages
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

// Pass the Passport Middleware
app.use(passport.initialize());

// Load Passport Strategies
const localRegistrationStrategy = require('./passport/local-registration');
const localLoginStrategy = require('./passport/local-login');

passport.use('local-registration', localRegistrationStrategy);
passport.use('local-login', localLoginStrategy);

// Pass the authorization checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

// Routes 
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const movieApi = require('./routes/movieApi');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/movieApi', movieApi);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found.............');
  err.status = 404;
  next(err);
});*/

// start the server
app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080 or http://127.0.0.1:8080');
});

