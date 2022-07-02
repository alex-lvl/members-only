var express = require('express');
var router = express.Router();
const clubhouseController = require('../controllers/clubhouseController');

router.get('/', clubhouseController.clubhouse_feed_get);

router.get('/join', clubhouseController.clubhouse_passcode_get);

router.post('/join', clubhouseController.clubhouse_passcode_post);

router.get('/form', clubhouseController.clubhouse_form_get);

router.post('/form', clubhouseController.clubhouse_form_post);


module.exports = router;
