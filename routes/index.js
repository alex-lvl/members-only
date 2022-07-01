var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.user) {
    res.render('index', { title: 'Message Board', user: undefined });
  } else {
    res.render('index', { title: 'Message Board', user: req.user });
  }
});

module.exports = router;
