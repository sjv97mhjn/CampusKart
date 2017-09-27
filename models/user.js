var mongoose = require('mongoose');
var passportlocalmongoose = require('passport-local-mongoose');
var userschema = new mongoose.Schema({
	name: String,
	email:String,
	phone:Number,
	hostel:String,
	floor:String,
	room:String,
});
userschema.plugin(passportlocalmongoose);
var user = mongoose.model('User',userschema);
module.exports = user;