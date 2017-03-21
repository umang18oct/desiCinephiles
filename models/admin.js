var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Admin = new Schema({
    name: String,
    username: String,
    email: String,
    password: String
});
Admin.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin', Admin);
