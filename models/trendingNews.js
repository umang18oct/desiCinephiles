var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TrendingNews = new Schema({
    mName: String,
    author: {
        type :mongoose.Schema.ObjectId,
        ref : "Admin"
    },
    postDate:{ type: Date, default: Date.now },
    post: String,
    horPoster: String,
    verPoster: String,
    rating: Number,
    releaseDate: {type: Date},
    oneLiner: String,
    type: String,
    shouldWatch: String
});
module.exports = mongoose.model('TrendingNews', TrendingNews);
