const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  status: Boolean,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
