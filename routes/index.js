var express = require('express');
var router = express.Router();
var passport = require('passport');
var multer = require('multer');
var Admin = require('../models/admin');
var Movie = require("../models/movie");
var Subscriber = require('../models/subscriber');
var TvShow = require("../models/tvShow");
var m = require("../middlewares");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'umang.chaudhary2015@vit.ac.in', // Your email id
            pass: '78654701' // Your password
        }
    });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home - desiCinephiles' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us - desiCinephiles' });
});
router.get('/movies', function(req, res, next) {
  res.render('movie', { title: 'Movies - desiCinephiles' });
});
router.get('/tvshows', function(req, res, next) {
  res.render('tvshows', { title: 'TV Shows - desiCinephiles' });
});
router.get('/login', function(req, res, next) {
  res.render('login_signup', { title: 'Login / SignUp - desiCinephiles' });
});

module.exports = router;
