const express = require("express");
const router = express.Router();
const config = require("../config/auth.config");
const { verifyToken } = require("../middleware/authTokens");
const User = require("../models/db/users");
const { fetchKycPendingUsers } = require("../models/logic/adminKyc");
const { createToken, getUserFromToken } = require("../models/logic/authTokens");
const {
  checkUserAndReturnToken,
  fetchUserDetails,
  updateUserDetails,
  extractUserDetails,
} = require("../models/logic/users");

router.get("/fetch_pending_kyc", verifyToken, async (req, res) => {
  const user = req.user;
  const result = await fetchKycPendingUsers().catch((err) => {
    console.log("error in fetching pending kyc user, err: ", err);
    res.json({ result: [], ok: false });
  });
  res.json({ result, ok: true }).status(200);
});

router.post("/kyc_verification", verifyToken, (req, res) => {
  // verify admin
  const user = req.user;
  if (user.isAdmin) {
  } else {
    res.json({ message: "you don't have access to this update kyc status" });
  }
});

module.exports = router;
