var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TvShow = new Schema({
    tName: String,
    author: {
        type :mongoose.Schema.ObjectId,
        ref : "Admin"
    },
    postDate:{ type: Date, default: Date.now },
    post: String,
    rating: Number,
    shouldWatch: String,
    horPoster: String,
    verPoster: String,
    lastAiredEpisodeDate: {type: Date},
    oneLiner: String,
    type: String
});
module.exports = mongoose.model('TvShow', TvShow);
