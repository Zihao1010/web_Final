const express = require('express');
const router = express.Router()
//import data models
const Food = require("../models/food");
const User = require("../models/user");

//console.log(User.find());

router.post("/add_new", function(req, res) {
  Food.findOne({foodid:req.body.foodid}, function(err, food) {
    if (food) {
      console.log("11111");
      res.render("error_add", {
         error: "This food ID already exists.",
      });
    }else{
      let new_food = new Food(req.body)
  var foodid = req.body.foodid;
  var name = req.body.name;
  var category = req.body.category;
  var image = req.body.image;
  var ingredient = req.body.ingredient;
  var description = req.body.description;
  var price = req.body.price;  
  new_food.save();
  res.redirect("dish");
    }
  });
});

router.post("/edit/edit", function(req, res) {
  var foodid = req.body.foodid;
  console.log(foodid);
  Food.find({foodid:foodid}, function(err, food) {
    console.log(req.body.name);
    food[0].name = req.body.name;
    food[0].category = req.body.category;
    food[0].image = req.body.image;
    food[0].ingredient = req.body.ingredient;
    food[0].description = req.body.description;
    food[0].price = req.body.price;  
    food[0].save();
  });
  res.redirect("/admin/dish");
});

router.get("/dish", function(req, res) {
           Food.find({}, function (err, food_list) {
             res.render("dish", {
               dishes:food_list
             });
  });
});
router.get("/admin_appetizer", function(req, res) {
           Food.find({category:"Appetizer"}, function (err, food_list) {
             res.render("admin_appetizer", {
               dishes:food_list
             });
  });
});

router.get("/admin_dessert", function(req, res) {
           Food.find({category:"dessert"}, function (err, food_list) {
             res.render("admin_dessert", {
               dishes:food_list
             });
  });
});
router.get("/admin_maincourse", function(req, res) {
           Food.find({category:"main course"}, function (err, food_list) {
             res.render("admin_maincourse", {
               dishes:food_list
             });
  });
});

router.get("/admin_drinks", function(req, res) {
           Food.find({category:"drink"}, function (err, food_list) {
             res.render("admin_drink", {
               dishes:food_list
             });
  });
});


router.get("/add_new", function(req, res) {
  res.render("add_new.html");
});

router.get("/edit/:id", function(req, res) {
          var tagid = req.params.id;
          var id = tagid.slice(4);
  Food.find({foodid: id}, function(err, food) {
    res.render("dish_edit", {
      food:food[0]
    });
  });
});

router.delete("/dish/:id", function(req, res) {
           var id = req.params.id;
           Food.find({foodid: id}, function (err, food) {
           food[0].remove(function(err){
        if(err){
          res.status(500).send(err);
        }
        else{
          res.status(204).send('removed');
        }
    });
  });
});

module.exports = router;
