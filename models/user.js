// Data Model for Customers or Admin
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true}, 
    isAdmin: {type: Boolean, default: false},
    privateInfo: {
      name: String,
      address: {
        city: {type: String},
        state: {type: String},
        zip: {type: Number}
      },
      phone:{type: String},
      email:{type: String}
    },
    cart:{
      name:{type: Array},
      price:{type: Array}
    },
    order:{
      name:{type: Array},
      price:{type: Array}
    }
    
  }
);
// Export model
module.exports = mongoose.model("user", userSchema);
