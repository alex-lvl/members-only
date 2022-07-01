var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/sign-up', function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.render('sign-up-form', { title: 'sign up' });
  } else {
    res.redirect('/');
  }
});

router.post('/sign-up', function (req, res, next) {
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
});

router.get('/log-in', function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.render('log-in', { title: 'log in', user: undefined });
  } else {
    res.redirect('/');
  }
});

router.post(
  '/log-in',
  function (req, res, next) {
    res.clearCookie('verified');
    next();
  },
  passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: './log-in',
  }),
);

router.get('/log-out', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie('verified');
    res.redirect('/');
  });
});

module.exports = router;
