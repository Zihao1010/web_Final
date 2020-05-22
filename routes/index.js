const express = require('express');
const router = express.Router()
//import data models
const Food = require("../models/food");
const User = require("../models/user");
const session = require('express-session');
//var popup = require("popup");

router.get("/", function(req,res){
    res.render("login");
});

router.get("/contact", function(req,res){
    res.render("contact");
});

//david part


router.use(session({
    secret :  'secret', 
    resave : true,
    saveUninitialized: false, 
    cookie : {
        maxAge : 1000 * 60 * 600, 
    },
}));


router.post("/login", function(req, res){
  var username = new RegExp(req.body.username);
  var password = new RegExp(req.body.password);
  User.findOne({username: username, password: password}, function(err, user){
               if(err){
                 res.status(404);
                 // res.render("error", {
                 //   error: "there no related user."
                 // });
               }else{
                 if(user == null){
                    res.send("<script>alert('user not found！');location.href='/'</script>")
                 }
                 else{
                   if(user.isAdmin===true){
                     res.status(200);
                     //req.session.user = user;
                     res.redirect("admin/dish")
                   }else{
                     res.status(200);    
                     req.session.user = user
                     res.redirect("all")
                   }
                 }
               }
  });
});

router.get("/logout", function(req, res){
  if(req.session.user){
    req.session.user = null;
    res.redirect("/");
  }
  else{
    res.redirect("/");
  }
});

// router.get("/home", function(req, res){
//   if(req.session.user){
//     //res.render("all", {user_info:req.session.user})
//     res.redirect("all")
//   // }else{
//   //   res.redirect("all")
//     }
// });

// david end

router.get("/all", function(req,res){
  Food.find({}, function (err, food){
    if(err){
      res.status(500).send(err);
    }
    res.render("all", {food_list: food,
                       user_info:req.session.user});
  });
});

router.get("/appetizer", function(req,res){
  Food.find({category: "Appetizer"},function (err, food){
    if(err){
      res.status(500).send(err);
    }
    res.render("appetizer", {food_list: food,
                             user_info:req.session.user});
  });
});

router.get("/maincourse", function(req,res){
  Food.find({category: "main course"},function (err, food){
    if(err){
      res.status(500).send(err);
    }
    res.render("maincourse", {food_list: food,
                              user_info:req.session.user});
  });
});

router.get("/dessert", function(req,res){
  Food.find({category: "dessert"},function (err, food){
    if(err){
      res.status(500).send(err);
    }
    res.render("dessert", {food_list: food,
                           user_info:req.session.user});
  });
});

router.get("/drink", function(req,res){
  Food.find({category: "drink"},function (err, food){
    if(err){
      res.status(500).send(err);
    }
    res.render("drink", {food_list: food,
                         user_info:req.session.user});
  });
});

router.post('/customer/:username/addcart', function(req, res){
  //let cart = new orders(req.body);
  var username = new RegExp(req.params.username);
//   User.find({username: username},function (err, user){
//     if(err){
//       res.status(500).send(err);
//     }
    
//       res.status(200).json(user);
//   });
  User.find({username: username},function (err, user){
    if(err){
      res.status(500).send(err);
    }
    user[0].cart.name.push(req.body.name);
    user[0].cart.price.push(req.body.price);
    user[0].save();
    //alert("Add cart successfully!!");
    res.render("cart_success", {message: "Add cart successfully!!",
                                user_info:req.session.user});
    //res.status(200).json(user);
  });
  
});

router.post('/customer/:username/order', function(req, res){
  var username = new RegExp(req.params.username);
  User.find({username: username},function (err, user){
    if(err){
      res.status(500).send(err);
    }
    user[0].order.name.push(req.body.name);
    user[0].order.price.push(req.body.price);
    while(user[0].cart.name.length!= 0){
      user[0].cart.name.shift();
      user[0].cart.price.shift();
    }
    user[0].save();
    res.render("order", {user_order: user});
    //res.status(200).json(user);
  });
  
});

router.get("/customer/:username/order", function(req,res){
  var username = new RegExp(req.params.username);
  User.find({username: username},function (err, user){
    if(err){
      res.status(500).send(err);
    }
    res.render("order", {user_order: user});
    //res.status(200).json({user, food});
  });  
  
});

router.post('/customer/:username/deletecart', function(req, res){
  //let cart = new orders(req.body);
  var username = new RegExp(req.params.username);

  User.find({username: username},function (err, user){
    if(err){
      res.status(500).send(err);
    }
    // for(var i = 0; i<user[0].cart.name.length;i++){
    //    user[0].cart.name[i];
    //    user[0].cart.price[i];
    // }
    while(user[0].cart.name.length!= 0){
      user[0].cart.name.shift();
      user[0].cart.price.shift();
    }
    
    user[0].save();
    // res.render("cart_success", {message: "Empty cart successfully!!",
    //                             user_info:req.session.user});
    res.redirect("/customer"+username+"cart");
    //res.status(200).json(user);
  });
  
});

router.get("/customer/:username", function(req,res){
  var username = new RegExp(req.params.username);
  //console.log(username);
  User.find({username: username},function (err, user){
    if(err){
      res.status(500).send(err);
    }
    Food.find({}, function (err, food){
    if(err){
      res.status(500).send(err);
    }
      res.render("customer", {users: user,
                              food_list: food});
      //res.status(200).json({user, food});
  });
    
  });
});

router.get("/customer/:username/cart", function(req,res){
  var username = new RegExp(req.params.username);
  User.find({username: username},function (err, cart){
    if(err){
      res.status(500).send(err);
    }
    res.render("cart", {user_cart: cart});
    //res.status(200).json({user, food});
  
    
  });  
  
});

router.post("/customer/:username/edit", function(req,res){
  var username = new RegExp(req.params.username);
  User.findOne({username: username},function (err, user){
    if(err){
      res.status(500).send(err);
    }
    user.privateInfo.name = req.body.name;
    user.privateInfo.address.city = req.body.city;
    user.privateInfo.address.state = req.body.state;
    user.privateInfo.address.zip = req.body.zip;
    user.privateInfo.phone = req.body.phone;
    user.privateInfo.email = req.body.email;
    user.save();
    req.session.user = user
    res.render("user_information", {message:"Update successfully!",
                                    user_edit: user,
                                    user_info:req.session.user});
    //res.status(200).json(user);
  
    
  });  
});

router.get("/edit", function(req,res){
    res.render("edit", {user_info:req.session.user});
});


module.exports = router;
