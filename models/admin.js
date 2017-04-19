var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Admin = new Schema({
    fname: String,
    lname: String,
    username: String,
    email: String,
    password: String,
    // movie: {
    //     type :mongoose.Schema.ObjectId,
    //     ref : "Movie"
    // },
    // trendingNews: {
    //     type :mongoose.Schema.ObjectId,
    //     ref : "TrendingNews"
    // },
    // tvShow: {
    //     type :mongoose.Schema.ObjectId,
    //     ref : "TvShow"
    // }
});
Admin.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin', Admin);
