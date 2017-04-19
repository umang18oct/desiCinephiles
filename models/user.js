var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
