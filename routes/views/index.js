 var mongoose = require('mongoose');

module.exports = {

	landing: function(req,res) {
		res.render("home.ejs");
	},

	registerPage: function(req,res) {
		res.render("register.ejs");
	},

	registerProcess: function(req,res) {
		var r = req.body;
		var J=phone(r.PHONE);
			if(r.EMAIL!=null&&r.NAME!=null&&r.USERNAME!=null&&r.PHONE!=null&&r.PASSWORD!=null&&J==0) {
				console.log(r);
			user.register(new user({username:r.USERNAME,email:r.EMAIL,name:r.NAME,phone:Number(r.PHONE)}),r.PASSWORD,function(err,uzer) {
				if(err) {
					//console.log(err);
					throw err;
				}
					//res.redirect('/login');
						  var email=r.EMAIL;
						   console.log('Email : ' +email);
								var message1 ='<h1>Welcome To CampusKart</h1> <h2>WE Are Happy To Welcome You .</h2> <h2>You have to just click on <a href="http://localhost:3000/' ,
									message2 ='/verify">this</a> to verify your email adress</h2> ',
					 				message3 = '<h4>For Any help or other stuff .Mail us at sjv97mhjn@gmail.com</h4> <h5>Thank You</h5>';
								client.sendEmail({
									    to: 'sjv97mhjn@gmail.com',
									    from: 'sjv97mhjn@gmail.com',
									    subject: 'greetings',
									    message: message1 +email + message2 + message3 ,
									    altText: 'plain text'
									  	},
									    function (err, data, result) {
									    if(err)
									    {
									      console.log(err);
									    }
									    else{
									      console.log("Email Sent");
									       res.render('verifyemail.ejs');
									    }

									 // ...
									});


			})
				}
			else

			{  console.log("Some Fields Are Emplty");

				res.redirect("/register");
			}
		},

	loginPage: function(req,res) {
		res.render("login.ejs");
	},

	logout: function(req,res) {
		req.logout();

		if(!req.user) {
		res.redirect("/"); }
	}

}
