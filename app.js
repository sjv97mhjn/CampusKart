var express 		= require('express'),
	app				= express(),
	bodyparser 		= require('body-parser'),
	bcrypt			= require('bcrypt-nodejs'),
	session			= require('express-session'),
	mongoose		= require('mongoose'),
	request			= require('request'),
	passport		= require('passport'),
	localstrategy   = require('passport-local'),
	user 			= require('./models/user'),
	passportlocalmongoose = require('passport-local-mongoose');
var port = 3000;

app.set('views',['./views']);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended :true}));
app.use(express.static("public"));
mongoose.Promise = global.Promise;
mongoose.connection.openUri("mongodb://sjv97mhjn:1997@ds151004.mlab.com:51004/campuskart");
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

const commentchema = new mongoose.Schema({
	name : String
});

const comment = mongoose.model('Comment',commentchema);


app.get("/",function(req,res){
	res.render("home.ejs");
})
app.get("/loggedin",function(req,res){
	console.log(req.user);
	res.send("Logged in");
})
app.post("/",function(req,res){
	comment.create({name:req.body.comment},function(result,err){
	if(err){
		console.log(err);
	}
})
	});


//Register Routes
app.get("/register",function(req,res){
	res.render("register.ejs");
})
app.post("/register",function(req,res){
	var r = req.body;
	var USER ={
	}

	user.register(new user({username:r.USERNAME,email:r.EMAIL,name:r.NAME,phone:Number(r.PHONE)}),r.PASSWORD,function(err,uzer){
		if(err){
			console.log(err);			
		}
			res.redirect('/login');
	})
})

//Login Routes
app.get("/login",function(req,res){
	res.render("login.ejs");
})
app.post("/login",passport.authenticate("local",{
        successRedirect:"/loggedin",
        failureRedirect:"/login"
}),function(req,res){

})

app.listen(port,function(){
	console.log("Example App Listening On port" + port);
})