var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subscriber = new Schema({
    email: String
});
module.exports = mongoose.model('Subscriber', Subscriber);
