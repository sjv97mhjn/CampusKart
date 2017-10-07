
var express = require('express'),
	passport		= require('passport'),
	user 			= require('../models/user');
var route  = express.Router();
var phone = function(phone){

var j = 0; 
	for(i=0;i<phone.length;i++)
	{  //console.log(phone[i]);
		if(phone[i]<'0'||phone[i]>'9')
		{  
			j++;	
		}
	}
	return j;
}

 function isloggedin(req,res,next){
        if(req.isAuthenticated()&&req.user.verified==1)
        {
            return next();
        }
        res.redirect("/login");
        
}

app.get("/",function(req,res){
	res.render("home.ejs");

})

//Register Routes
app.get("/register",function(req,res){
	res.render("register.ejs");
})
app.post("/register",function(req,res){
var r = req.body;
var J=phone(r.PHONE);
console.log(J);

	if(r.EMAIL!=null&&r.NAME!=null&&r.USERNAME!=null&&r.PHONE!=null&&r.PASSWORD!=null&&J==0){
		console.log(r);
	user.register(new user({username:r.USERNAME,email:r.EMAIL,name:r.NAME,phone:Number(r.PHONE)}),r.PASSWORD,function(err,uzer){
		if(err){
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
})
//Verification Routes
	app.get("/:email/verify",function(req,res){
		//res.render("/login");
		var Email = req.params.email;
		console.log(Email);
		user.findOneAndUpdate({email:Email},{$set:{verified:1}},function(err,result){
			if(err) console.log(err);
			else {
				console.log("Email Verified");
				res.redirect("/login");
			}
		})
	})

route.get("/login",function(req,res){
	res.render("login.ejs");
})
route.post("/login",passport.authenticate("local",{
        successRedirect:"/loggedin",
        failureRedirect:"/login"
}),function(req,res){

})
route.get("/logout",function(req,res){
	req.logout();

	if(!req.user){
	res.redirect("/"); }
})
route.get("/loggedin",isloggedin,function(req,res){
	console.log(req.user);
	res.render("loggedin.ejs");
})


module.exports = route;