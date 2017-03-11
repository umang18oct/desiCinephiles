var express = require('express');
var router = express.Router();

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

module.exports = router;
