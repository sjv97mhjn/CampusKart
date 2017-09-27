var express 		= require('express'),
	app				= express(),
	bodyparser 		= require('body-parser'),
	bcrypt			= require('bcrypt-nodejs'),
	session			= require('express-session'),
	request			= require('request');
var port = 3000;
app.set('views',['./views']);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended :true}));
app.use(express.static("public"));

app.get("/",function(req,res){
	res.send("Campus Kart");
})

app.listen(port,function(){
	console.log("Example App Listening On port" + port);
})