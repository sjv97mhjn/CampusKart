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
	Regex			= require('regex'),
	passportlocalmongoose = require('passport-local-mongoose'),
    port 			= 3000;

app.set('views',['./views']);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended :true}));
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(require("express-session")({ secret:"My_Name_Is_Sajeev_Mahajan",resave:false,saveUninitialized :false}));
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
mongoose.Promise = global.Promise;
mongoose.connection.openUri(controls.mongourl);
// mongoose.connection.on('error', (err) => {
//   console.error(err);
//   console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
//   process.exit();
//});
 
var index = require('./routes/index');
app.get('/',index);


app.listen(port,function(){
	console.log("Example App Listening On port" + port);
})