const Users = require('../models/user');
const Message = require('../models/message');
const async = require('async');
const mongoose = require('mongoose');
const Passcode = require('../models/passcode');
const { body, validationResult } = require('express-validator');

exports.clubhouse_feed_get = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/users/log-in');
  } else if (req.isAuthenticated() && req.cookies.verified === undefined) {
    res.render('clubhouse', {
      title: 'Club House',
      user: req.user,
      verified: false,
    });
  } else if (
    req.isAuthenticated() &&
    JSON.parse(req.cookies.verified) === true
  ) {
    Message.find()
    .sort({date: -1})
    .limit(50)
    .populate('author')
    .exec(function (err, list_message) {
      if (err) {
        return next(err);
      }
      res.render('clubhouse', {
        title: 'Club House',
        message_list: list_message,
        user: req.user,
        verified: JSON.parse(req.cookies.verified),
      });
    });
  }
};

exports.clubhouse_passcode_get = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/users/log-in');
  } else if (req.isAuthenticated() && req.cookies.verified === undefined) {
    res.render('join-club', { title: 'Club House', user: req.user });
  } else {
    res.redirect('/');
  }
};

exports.clubhouse_passcode_post = function (req, res, next) {
  Passcode.findById('62bbbbf0227ea4608bacd251').exec(function (err, passcode) {
    if (err) {
      return next(err);
    }
    if (passcode === null) {
      let err = new Error('Passcode not found');
      err.status = 404;
      return next(err);
    } else if (passcode.passcode === req.body.passcode && req.user) {
      // const d = new Date();
      // d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
      // let expire = d.toUTCString();
      res.cookie('verified', true, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      res.redirect('/clubhouse');
    }
  });
};

exports.clubhouse_form_get = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/users/log-in');
  } else if (req.isAuthenticated() && req.cookies.verified === undefined) {
    res.redirect('/clubhouse');
  } else if (
    req.isAuthenticated() &&
    JSON.parse(req.cookies.verified) === true
  ) {
    res.render('clubhouse_form', {
      title: 'Create New Message',
      user: req.user,
      verified: JSON.parse(req.cookies.verified),
    });
  }
};

exports.clubhouse_form_post = [
  body('message', 'message required').trim().isLength({ min: 1 }).escape(),

  function (req, res, next) {
    const errors = validationResult(req);

    var message = new Message({
      message: req.body.message,
      author: req.body.author,
    });

    if (!errors.isEmpty()) {
      res.render('clubhouse_form', {
        title: 'Create New Message',
        user: req.user,
        verified: JSON.parse(req.cookies.verified),
        errors: errors.array(),
      });
      return;
    } else {
      //data is valid
      message.save(function (err) {
        if (err) {
          return next(err);
        }
        //success
        console.log('New Message ' + message);
        res.redirect('/clubhouse');
      });
    }
  },
];
