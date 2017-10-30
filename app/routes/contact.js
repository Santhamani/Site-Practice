var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer')
//var mailgun = require('mailgun-js');
//var path = require('path');
//var fs = require('fs');


router.get('/contact', function(req, res) {

  res.render('contact', {
    info : '',
    pageTitle: 'Contact',
    pageId: 'contact'
  });

});

/*
router.get('/contactus', function(req, res) {

  res.render('feedback', {
    pageTitle: 'Feedback',
    pageId: 'feedback'
  });

});*/

module.exports = router;