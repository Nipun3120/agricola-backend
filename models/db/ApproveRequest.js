const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userAddress: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  approvedBy: String,
  approveDate: Date,
  exceptional: String,
  // isAdmin
});

module.exports = mongoose.model("ApproveRequest", userSchema);
