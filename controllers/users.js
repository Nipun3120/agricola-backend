const express = require("express");
const router = express.Router();
const config = require("../config/auth.config");
const { verifyToken } = require("../middleware/authTokens");
const User = require("../models/db/users");
const { createToken, getUserFromToken } = require("../models/logic/authTokens");
const {
  checkUserAndReturnToken,
  fetchUserDetails,
  updateUserDetails,
} = require("../models/logic/users");

router.post("/login", async (req, res) => {
  try {
    const { address, accessToken } = req.body;
    const existingUser = await getUserFromToken(accessToken);
    if (existingUser) {
      if (existingUser.address === address) {
        // verified, return
        res.json({ accessToken: token.split(" ")[1] }).status(200);
      } else {
        // user have a token which is not linked with the provided address
        // create new token for corresponding to this address
        const accessToken = await checkUserAndReturnToken(address);
        res.json({ accessToken }).status(200);
      }
    } else {
      const accessToken = await checkUserAndReturnToken(address);
      res.json({ accessToken }).status(200);
    }
  } catch (err) {
    console.log("throwing error", err);
    res.json({ message: "Try again" }).status(400);
  }
});

router.post("/save_profile", verifyToken, async (req, res) => {
  const uid = req.user.uid;
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    streetAddress,
    state,
    city,
    pincode,
  } = req.body;
  const result = await updateUserDetails(
    uid,
    firstName,
    lastName,
    email,
    phoneNumber,
    streetAddress,
    state,
    city,
    pincode
  );
  res.json({ saved: result.saved }).status(200);
});

router.post("/fetch_user_details", verifyToken, async (req, res) => {
  const uid = req.user.uid;
  const userDetails = await fetchUserDetails(uid);
  res.json({ userDetails }).status(200);
});

module.exports = router;
