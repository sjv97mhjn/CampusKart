var express 		= require('express'),
	app				= express(),
	bodyparser 		= require('body-parser'),
	bcrypt			= require('bcrypt-nodejs'),
	session			= require('express-session'),
	mongoose		= require('mongoose'),
	request			= require('request'),
	passport		= require('passport'),
	localstrategy   = require('passport-local'),
	ses 			= require('node-ses'), 
	controls		= require('./models/config'),
	client			= ses.createClient({ key: controls.Ases_KID, secret: controls.Ases_AKey}),
	user 			= require('./models/user'),
	flightDetails 	= require("./models/flightDetails"),
	flightBooking 	= require("./models/flightBooking"),
	Regex			= require('regex'),
	passportlocalmongoose = require('passport-local-mongoose');
var port = 3000;
app.set('views',['./views']);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended :true}));
app.use(express.static(__dirname + "/public"));
mongoose.Promise = global.Promise;
mongoose.connection.openUri(controls.mongourl);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
 app.use(require("express-session")({
        secret:"My_Name_Is_Sajeev_Mahajan",
        resave:false,
        saveUninitialized :false
        
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

 function isloggedin(req,res,next){
        if(req.isAuthenticated()&&req.user.verified==1)
        {
            return next();
        }
        res.redirect("/login");
        
}

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

app.get("/",function(req,res){
	res.render("main.ejs",{currentUser:null});

})

//Register Routes
app.post("/register",function(req,res){
var r = req.body;
var J=Number(r.PHONE);
console.log(r);

	if(r.EMAIL!=null&&r.NAME!=null&&r.USERNAME!=null&&r.PHONE!=null&&r.PASSWORD!=null&&J!=0){
		console.log(r);
	user.register(new user({username:r.USERNAME,email:r.EMAIL,name:r.NAME,phone:Number(r.PHONE)}),r.PASSWORD,function(err,uzer){
		if(err){
			//console.log(err);
			throw err;			
		}
				console.log(uzer);
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
//Login Routes
app.get("/login",function(req,res){
	res.render("main.ejs",{currentUser:null});
})
app.post("/login",passport.authenticate("local",{
        successRedirect:"/list",
        failureRedirect:"/login"
}),function(req,res){
	console.log(req.body);
})
// app.post("/login",function(req,res){
// 	res.send(req.body);
// })
app.get("/logout",function(req,res){
	req.logout();

	if(!req.user){
	res.redirect("/"); }
})
app.get("/map",function(req,res){
	res.render("map.ejs");
})

app.get("/list",function(req,res){
	//res.render("flight.ejs",{flightDetails:})
	flightDetails.find({}).exec(function(err, allFlightDetails) {
			if (err) {
				console.log(err);
			}

			res.render("flight.ejs", { flightDetails:allFlightDetails})
	 	})
// var ObjectId = require('mongodb').ObjectID;
//  flightBooking.create({flightId:,gate: "asd",flightArrival_time: new Date(),flightDeparture_time: new Date()},function(err,res){
//  	if(err){throw err;}
//  	else{
//  		console.log("Success");
//  	}
//  })
 })

app.get("/list/:id", function(req, res) {
	res.render("map.ejs");
})
app.post("/price/:fi",function(req,res) {
	var ObjectId = require('mongodb').ObjectID;
	//res.send(typeof(ObjectId("1234321412")));


    //
    console.log("Postman request hit");
	flightBooking.findOneAndUpdate({flightId:ObjectId(req.params.fi),userId:ObjectId(req.params.ui)},{$set:{maxPrice:req.params.ep} },function(err,result){
		if(err){
			console.log(err);
		}
		else{
			res.send("success");
		}
	})
})

app.listen(port,function(){
	console.log("Example App Listening On port" + port);
})