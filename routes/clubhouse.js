var express = require('express');
var router = express.Router();
const clubhouseController = require('../controllers/clubhouseController');

router.get('/', clubhouseController.clubhouse_feed_get);

router.get('/join', clubhouseController.clubhouse_passcode_get);

router.post('/join', clubhouseController.clubhouse_passcode_post);

module.exports = router;
