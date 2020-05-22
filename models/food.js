// Data Model for Menu
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    foodid:{type: String},
    name:{type: String},
    category:{type:String},
    image: {type:String},
    ingredient: {type: String},
    description: {type: String},
    price:{type: Number}
  }
);

// Export model
module.exports = mongoose.model("food", foodSchema);
