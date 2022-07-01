const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.users_signup_get = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.render('sign-up-form', { title: 'sign up' });
  } else {
    res.redirect('/');
  }
}

exports.users_signup_post = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    const user = new User({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      username: req.body.username,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/users/log-in');
    });
  });
}

exports.users_login_get = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.render('log-in', { title: 'log in', user: undefined });
  } else {
    res.redirect('/');
  }
}

exports.users_login_post = function (req, res, next) {
  res.clearCookie('verified');
  next();
}

exports.users_logout_post = function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie('verified');
    res.redirect('/');
  });
}