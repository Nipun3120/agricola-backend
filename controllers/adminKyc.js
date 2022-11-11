const express = require("express");
const router = express.Router();
const config = require("../config/auth.config");
const { verifyToken } = require("../middleware/authTokens");
const User = require("../models/db/users");
const {
  fetchKycPendingUsers,
  kycStatusUpdate,
} = require("../models/logic/adminKyc");
const { createToken, getUserFromToken } = require("../models/logic/authTokens");
const {
  checkUserAndReturnToken,
  fetchUserDetails,
  updateUserDetails,
  extractUserDetails,
} = require("../models/logic/users");

router.get("/fetch_pending_kyc", async (req, res) => {
  const result = await fetchKycPendingUsers().catch((err) => {
    console.log("error in fetching pending kyc user, err: ", err);
    res.json({ result: [], ok: false }).status(200);
  });
  res.json({ result, ok: true }).status(200);
});

router.post("/kyc_verification_update", async (req, res) => {
  // verify admin
  // const user = req.user;

  // if (user.isAdmin) {
  // } else {
  //   res.json({ message: "you don't have access to this update kyc status" });
  // }

  // decision-> "true for approve, false for decline"
  const decision = req.body.decision;
  const userMetamaskAccount = req.body.userMetamaskAccount;

  const result = await kycStatusUpdate(decision, userMetamaskAccount).catch(
    (err) => {
      console.log("error in updating user kyc status, err: ", err);
      res.json({ ok: false }).status(200);
    }
  );

  res.json({ result, ok: true }).status(200);
});

module.exports = router;
