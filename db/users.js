const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  rollNo : String,
  regNo : String,
  phoneNo : String,
  section: String,
  certiLink: String,
  certificates : []
});

module.exports = mongoose.model('users', usersSchema);