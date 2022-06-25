var express = require('express');
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/users/log-in');
  } else {
    res.render('message-board', { title: 'Message Board', user: req.user });
  }
});

module.exports = router;
