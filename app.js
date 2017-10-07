var express 				= require('express'),
	app						= express(),
	bodyParser 				= require('body-parser'),
	bcrypt					= require('bcrypt-nodejs'),
	session					= require('express-session'),
	mongoose				= require('mongoose'),
	request					= require('request'),
	passport				= require('passport'),
	localstrategy   		= require('passport-local'),
	ses 					= require('node-ses'),
	controls				= require('./models/config'),
	client					= ses.createClient({ key: controls.Ases_KID, secret: controls.Ases_AKey}),
	user 					= require('./models/user'),
	Regex					= require('regex'),
	passportlocalmongoose 	= require('passport-local-mongoose'),
	methodOverride			= require('method-override');

    port 					= 3000;

var routes = require('./routes/index');

mongoose.connect("mongodb://localhost/vistara");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(methodOverride("_method"));

app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({ secret:"My_Name_Is_Sajeev_Mahajan",resave:false,saveUninitialized :false}));
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next) {
	console.log(req.user);
   		res.locals.currentUser = req.user;
   next();
});

// mongoose.Promise = global.Promise;
// mongoose.connection.openUri(controls.mongourl);
// mongoose.connection.on('error', (err) => {
//   console.error(err);
//   console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
//   process.exit();
// });



app.use("/", routes);


app.listen(port,function() {
	console.log("Example App Listening On port" + port);
})
