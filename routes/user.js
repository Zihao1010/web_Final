const express = require('express');
const router = express.Router()
//const bodyParser = require('body-parser');

const User = require("../models/user");

router.get("/signup", function(req, res){
  res.render("signup");
});


router.post("/signup", function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  //console.log(req.body.name);
  User.findOne({username: username}, function(err, user){
    if (user) {
      res.render("error", {
         error: "There exists the same user.",
      });
    }else{
      let user = new User();
      user.username = req.body.username;
      //console.log(req.body.usernam);
      user.password = req.body.password;
      user.privateInfo.name = req.body.name;
      user.privateInfo.address.city = req.body.city;
      user.privateInfo.address.state = req.body.state;
      user.privateInfo.address.zip = req.body.zip;
      user.privateInfo.email = req.body.email;
      user.privateInfo.phone = req.body.phone;
      user.save();
      res.render("login");
    }
  });
});




module.exports = router;
