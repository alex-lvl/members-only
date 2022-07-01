var express = require('express');
var router = express.Router();
const passport = require("passport");
const messagesController = require('../controllers/messagesController');
const LocalStrategy = require("passport-local").Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/users/log-in');
  } else if (req.isAuthenticated() && req.cookies.verified === undefined) {
    res.render('message-board', { title: 'Message Board', user: req.user, verified: false });
  } else if (req.isAuthenticated() && JSON.parse(req.cookies.verified) === true){
    res.render('message-board', { title: 'Message Board', user: req.user, verified: JSON.parse(req.cookies.verified) });  }
});

/* GET home page. */
router.get('/join', function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/users/log-in');
  } else if (req.isAuthenticated() && req.cookies.verified === undefined) {
    res.render('join-club', { title: 'Message Board', user: req.user });
  } else {
    res.redirect('/')
  }
});

router.post('/join', messagesController.messages_postCode);

module.exports = router;
