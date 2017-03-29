var express = require('express');
var router = express.Router();
var passport = require('passport');
var multer = require('multer');
var cloudinary = require("cloudinary");
var cloudinaryStorage = require('multer-storage-cloudinary');
cloudinary.config({
  cloud_name: 'umang18oct',
  api_key: '356452225574928',
  api_secret: '67mKf9pg28kUGEvTX7QKlzS_spU'
});
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'desiCinephiles',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
var mongoose = require('mongoose');
var upload = multer({ storage: storage });
var Admin = require('../models/admin');
var Movie = require("../models/movie");
var Subscriber = require('../models/subscriber');
var TvShow = require("../models/tvShow");
var TrendingNews = require("../models/trendingNews");
var m = require("../middlewares");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'desicinephiles@gmail.com', // Your email id
            pass: 'S@marth2002' // Your password
        }
    });

/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.find().sort({postDate:-1}).limit(6).exec(function(err,movies){
    if(err)throw err;
    res.render('index',{
      movies: movies,
      title: 'Home - desiCinephiles'
    });
  });
});

router.get('/home', function(req, res, next) {
  Movie.find().sort({postDate:-1}).limit(6).exec(function(err,movies){
    if(err)throw err;
    res.render('home',{
      movies: movies,
      title: 'Home - desiCinephiles'
    });
  });
});

router.post('/subscribe', function(req,res,next){
  var subscriber = new Subscriber({
    email: req.body.email
  });
  var mailOptions = {
    from: 'desicinephiles@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'Successful Subscription :)', // Subject line
    text: 'Greetings from desiCinephiles. . . . . . . . . . ' //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      //console.log(error);
      res.redirect('/error');
    }
    else{
      //console.log('Message sent: ' + info.response);
          res.redirect('/success');
        };
    });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us - desiCinephiles' });
});

router.get('/movies', function(req, res, next) {
  Movie.find().sort({postDate:-1}).limit(5).exec(function(err,recentMovies){
    if(err)throw err;
    Movie.find().sort({rating:-1}).limit(5).exec(function(err,mostRatedMovies){
      if(err)throw err;
      TrendingNews.find().sort({postDate:-1}).limit(5).exec(function(err,trendingNews){
        if(err)throw err;
        res.render('movie',{
          recentMovies: recentMovies,
          mostRatedMovies: mostRatedMovies,
          trendingNews: trendingNews,
          title: 'Movies - desiCinephiles'
        });
      });
    });
  });
});

router.get('/tvshows', function(req, res, next) {
  TvShow.find().sort({postDate:-1}).limit(5).exec(function(err,recentTvShows){
    if(err)throw err;
    TvShow.find().sort({rating:-1}).limit(5).exec(function(err,mostRatedTvShows){
      if(err)throw err;
      res.render('tvshows', {
        recentTvShows: recentTvShows,
        mostRatedTvShows: mostRatedTvShows,
        title: 'TV Shows - desiCinephiles'
      });
    });
  });
});

router.get('/login', function(req, res, next) {
  res.render('login_signup', { title: 'Login / SignUp - desiCinephiles' });
});

router.post('/register', function(req, res) {
    req.body.username = req.body.id;
    if(req.body.id=="umang18oct"||req.body.id=="cinePhile.1"||req.body.id=="cinePhile.2"||req.body.id=="cinePhile.3"||req.body.id=="cinePhile.4"){
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
    }
    else{
      res.redirect('/error');
    }
});

router.post('/login',function(req,res,next){
  console.log(req.body.id);
  req.body.username = req.body.id;
  next();
} ,passport.authenticate('local'), function(req, res) {
    res.redirect('/admin');
});
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/home');
  }
}

router.get('/admin', m.authenticatedOnly, function(req, res, next) {
  // console.log("user"+req.user);
  res.render('admin', { title: 'Admin Panel - desiCinephiles', admin:req.user });
});

router.get('/review/:type/:id', function(req, res, next) {
  var type = req.params.type;
  var id = mongoose.Types.ObjectId(req.params.id);
  // console.log("type:"+type);
  // console.log("id:"+id);
  if(type=="movie"){
    Movie.findOne({_id:id}).populate("author").exec(function(err, movie){
      if(err)throw err;
      //console.log(movie);
      //console.log(movie.author);
      res.render('review', {
        title: 'Review - desiCinephiles',
        review: movie
      });
    });
  }
  else if(type=="tvshow"){
    TvShow.findOne({_id: id}).populate("author").exec(function(err, tvShow){
      if(err)throw err;
      res.render('review', {
        title: 'Review - desiCinephiles',
        review: tvShow
      });
    });
  }
  else if(type=="trending"){
    TrendingNews.findOne({_id: id}).populate("author").exec(function(err, trendingNews){
      res.render('review', {
        title: 'Review - desiCinephiles',
        review: trendingNews
      });
    });
  }
  else{
    res.render('error');
  }
});

router.post('/admin', upload.any(), m.authenticatedOnly, function(req, res) {
  //console.log(req.files);
  req.admin=req.user;

  console.log(req.body.checkType);
  if(req.body.checkType=="movie"){
    console.log(req.admin);
    var movie = new Movie({
      mName: req.body.mName,
      director: req.body.director,
      postDate : new Date(),
      post: req.body.post,
      rating: req.body.rating,
      shouldWatch: req.body.shouldWatch,
      horPoster: req.files[0].url,
      verPoster: req.files[1].url,
      releaseDate: req.body.releaseDate,
      oneLiner: req.body.oneLiner,
      trailerLink: req.body.trailerLink,
      author : req.admin,
      type: req.body.checkType
    });
    movie.save(function(err){
      if(err){
        console.log("ERROR : ",err);
      }else{
        return res.redirect("/admin");
      }
    });
  }
  else if(req.body.checkType=="tvshow"){
    var tvshow = new TvShow({
      tName: req.body.tName,
      director: req.body.director,
      postDate : new Date(),
      post: req.body.post,
      rating: req.body.rating,
      shouldWatch: req.body.shouldWatch,
      horPoster: req.files[0].url,
      verPoster: req.files[1].url,
      oneLiner: req.body.oneLiner,
      author : req.admin,
      type: req.body.checkType
    });
    tvshow.save(function(err){
      if(err){
        console.log("ERROR : ",err);
      }else{
        return res.redirect("/admin");
      }
    });
  }
  else{
    var trending = new TrendingNews({
      mName: req.body.tnName,
      director: req.body.director,
      postDate : new Date(),
      post: req.body.post,
      rating: req.body.rating,
      horPoster: req.files[0].url,
      verPoster: req.files[1].url,
      releaseDate: req.body.releaseDate,
      oneLiner: req.body.oneLiner,
      trailerLink: req.body.trailerLink,
      author : req.admin,
      type: req.body.checkType,
      shouldWatch: req.body.shouldWatch,
    });
    trending.save(function(err){
      if(err){
        console.log("ERROR : ",err);
      }else{
        return res.redirect("/admin");
      }
    });
  }
});

router.post('/contact', function(req,res,next){
  var mailOptions = {
    from: 'desicinephiles@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: req.body.subject, // Subject line
    text: "We'll get back to you soon. Thank you for contacting us." //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      //console.log(error);
      res.redirect('/error');
    }
    else{
      //console.log('Message sent: ' + info.response);
          res.redirect('/home');
        };
    });
});

router.get('/success', function(req, res, next) {
  res.render('success', { title: 'Successful Subscription - desiCinephiles'});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/home');
});

router.get('/error',function(req,res){
  res.render('error', {title: 'Unauthorized - desiCinephiles'});
});

module.exports = router;
