var express 		= require('express'),
	app				= express(),
	bodyparser 		= require('body-parser'),
	bcrypt			= require('bcrypt-nodejs'),
	session			= require('express-session'),
	mongoose		= require('mongoose'),
	request			= require('request'),
	methodOverride  = require('method-override'),

	port 			= 3000,

	routes 			= require('./routes/route')


app.use(bodyparser.urlencoded({ extended :true }));
app.use(express.static(__dirname + "public"));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

// if we use mongo in our localhost
mongoose.connect("mongodb://localhost/campuskart");
//  if we use mongolab
// mongoose.connection.openUri("mongodb://sjv97mhjn:1997@ds151004.mlab.com:51004/campuskart");
// mongoose.connection.on('error', (err) => {
//   console.error(err);
//   // console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
//   process.exit();
// });

app.use("/", routes);

app.listen(port,function(){
	console.log("Listening On port " + port);
})
