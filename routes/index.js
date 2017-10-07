
var express 		= require('express'),
	passport		= require('passport'),
	user 			= require('../models/user');

var router  = express.Router();

var routes = {
  views: {
    index: require("./views/index")
  }
}



router.get("/", routes.views.index.landing);
router.get("/register", routes.views.index.registerPage);

router.post("/register", routes.views.index.registerProcess);

router.get("/login", routes.views.index.loginPage);

router.post("/login",passport.authenticate("local",{
        successRedirect:"/loggedin",
        failureRedirect:"/login"
}),function(req,res) {

})

router.get("/logout", routes.views.index.logout);

// router.get("/loggedin",isloggedin,function(req,res) {
// 	console.log(req.user);
// 	res.render("loggedin.ejs");
// })

// var phone = function(phone) {

// var j = 0;
// 	for(i=0;i<phone.length;i++)
// 	{  //console.log(phone[i]);
// 		if(phone[i]<'0'||phone[i]>'9')
// 		{
// 			j++;
// 		}
// 	}
// 	return j;
// }

// function isloggedin(req,res,next) {
//         if(req.isAuthenticated()&&req.user.verified==1)
//         {
//             return next();
//         }
//         res.redirect("/login");

// }

module.exports = router;
