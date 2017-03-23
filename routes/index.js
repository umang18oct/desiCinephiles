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

router.post('/register', function(req, res) {
    req.body.username = req.body.id;
    Admin.register(new Admin({ email : req.body.email,fname : req.body.fname,lname : req.body.lname, username : req.body.id, mobNo : req.body.mobNo
    }), req.body.password, function(err, admin) {
        if (err) {
          console.log(err);
            return res.render('login_signup', { admin : admin });
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/admin');
        });
    });
});

router.post('/login',function(req,res,next){
  console.log(req.body.id);
  req.body.username = req.body.id;
  next();
} ,passport.authenticate('local'), function(req, res) {
    res.redirect('/admin');
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Admin Panel - desiCinephiles', admin:req.admin });
});

router.get('/review/:postid', function(req, res, next) {
  var id = req.params.postid;
  console.log(id);
  res.render('review', { title: 'Review - desiCinephiles' });
});

router.post('/admin', m.authenticatedOnly, function(req, res) {
  var movie = new Movie({
    mName: req.body.mName,
    director: req.body.director,
    postDate : new Date(),
    post: req.body.post,
    rating: req.body.rating,
    shouldWatch: req.body.shouldWatch,
    horPoster: req.body.horPoster,
    verPoster: req.body.verPoster,
    releaseDate: req.body.releaseDate,
    id: req.body.id,
    author : req.admin
  });
  movie.save(function(err){
    if(err){
      console.log("ERROR : ",err);
    }else{
      return res.redirect("/admin");
    }
  });
});
module.exports = router;
