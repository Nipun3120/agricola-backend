const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, default: null },
  phoneNumber: { type: Number, default: null },
  streetAddress: { type: String, default: null },
  state: { type: String, default: null },
  city: { type: String, default: null },
  pincode: { type: Number, default: null },
  metamaskAccount: { type: String, unique: true },
  // isAdmin
});

module.exports = mongoose.model("User", userSchema);
