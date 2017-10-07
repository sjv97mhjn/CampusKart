var mongoose = require('mongoose');
var user = require('../../models/user');
var flightDetails = require("../../models/flightDetails");
var passport = require('passport');

module.exports = {

	landing: function(req,res) {
		res.render("index.ejs");
	},

	registerPage: function(req,res) {

		res.render("register.ejs");
	},

	registerProcess: function(req,res) {
		var r = req.body;

		if(r.email!=null&&r.username!=null&&r.phone!=null&&r.password!=null) {
			user.register(new user({username: r.username,email: r.email, phone:r.phone }), r.password,function(err,uzer) {
				//console.log(err);

				if(err) {
					console.log(err);
            		return res.render("register");
				}
				else{

				//console.log(req);
		        passport.authenticate("local")(req, res, function() {
		           res.redirect("/register");
		        });}
			})
		}

	},

	logout: function(req,res) {
		req.logout();

		if(!req.user) {
		res.redirect("/"); }
	},

	list: function(req, res) {
		// TO Do..
		flightDetails.find({}).exec(function(err, allFlightDetails) {
			if (err) {
				console.log(err);
			}

			res.render("flightList", { flightDetails: allFlightDetails })
		})
	}

}
