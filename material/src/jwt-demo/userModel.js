const mongoose = require("mongoose");

// Define a Mongoose schema for the user
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  hashedPassword: String,
});

// Create a Mongoose model based on the schema
const User = mongoose.model("User", userSchema);
module.exports = User;
