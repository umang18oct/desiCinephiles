var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TvShow = new Schema({
    author: {
        type :mongoose.Schema.ObjectId,
        ref : "Admin"
    },
    postDate:{ type: Date, default: Date.now },
    post: String,
    postImages: [String],
    rating: Number,
    shouldWatch: String,
    lastAiredEpisodeDate: {type: Date}
});
module.exports = mongoose.model('TvShow', TvShow);
