const passport = require('passport');
const session = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');
const config = require('../config/config');

require('./passport');

// I should probably create another secret
// for this one dedicated just for SESSION

module.exports = () => {
  const middleware = [
    helmet(),
    session({
      secret: config.JWT_SECRET,
      resave: true,
      saveUninitialized: true
    }),
    passport.initialize(),
    passport.session()
    // disable csrf for now, to give way
    // to containerized app on cluster
    // csrf(),
    // async (req, res, next) => {
    //   res.cookie('XSRF-TOKEN', req.csrfToken());
    //   return next();
    // }
  ];
  return middleware;
};