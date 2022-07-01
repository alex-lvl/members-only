var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');
const passport = require('passport');


/* GET users listing. */
router.get('/sign-up', usersController.users_signup_get);

router.post('/sign-up', usersController.users_signup_post);

router.get('/log-in', usersController.users_login_get);

router.post(
  '/log-in',
  usersController.users_login_post,
  passport.authenticate('local', {
    successRedirect: '/clubhouse',
    failureRedirect: './log-in',
  }),
);

router.get('/log-out', usersController.users_logout_post);

module.exports = router;
