var mongoose = require('mongoose');
var passportlocalmongoose = require('passport-local-mongoose');

var userschema = new mongoose.Schema({
	username: String,
	email:String,
	phone:Number,
	password: String,
	accessToken: String,
	createdat: { type: Date, default: Date.now }
});

userschema.plugin(passportlocalmongoose);

module.exports = mongoose.model('user',userschema);

