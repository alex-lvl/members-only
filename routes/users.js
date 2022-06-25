var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");

/* GET users listing. */
router.get('/sign-up', function (req, res, next) {
  res.render('sign-up-form', {title: 'sign up'});
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
      res.redirect('/messages');
    });
  });
});

router.get(
  '/log-in',
  function (req, res, next) {
      res.render('log-in', {title: 'log in'});
  }
);

router.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/messages',
    failureRedirect: './log-in',
  })
);

router.get("/log-out", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
