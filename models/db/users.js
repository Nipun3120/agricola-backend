const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  metamaskAccount: { type: String, unique: true },

  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  email: { type: String, default: null },
  phoneNumber: { type: Number, default: null },
  streetAddress: { type: String, default: null },
  state: { type: String, default: null },
  city: { type: String, default: null },
  pincode: { type: Number, default: null },

  aadhaarNumber: { type: Number, default: null },
  panNumber: { type: String, default: null },
  income: { type: Number, default: null },
  occupation: { type: String, default: null },
  about: { type: String, default: null },

  isKycVerified: { type: Boolean, default: false },
  kycStatus: { type: String, default: "incomplete" }, // incomplete -> pending -> approved
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
