const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, default: null },
  phoneNumber: { type: String, default: null },
  address: { type: String, default: null },
});

module.exports = mongoose.model("User", userSchema);
