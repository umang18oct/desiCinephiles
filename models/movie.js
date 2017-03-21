var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Movie = new Schema({
    author: {
        type :mongoose.Schema.ObjectId,
        ref : "Admin"
    },
    postDate:{ type: Date, default: Date.now },
    post: String,
    postImages: [String],
    rating: Number,
    shouldWatch: String,
    director: String,
    releaseData: {type: Date}
});
module.exports = mongoose.model('Movie', Movie);
