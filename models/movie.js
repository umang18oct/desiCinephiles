var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Movie = new Schema({
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
    shouldWatch: String,
    director: String,
    releaseDate: {type: Date},
    oneLiner: String,
    trailerLink: String,
    type: String,
    edit: String
});
module.exports = mongoose.model('Movie', Movie);
