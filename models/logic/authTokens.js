const config = require("../../config/auth.config");
const jwt = require("jsonwebtoken");
const User = require("../db/users");

const createToken = (data, secret, time) => {
  let token = jwt.sign(data, secret, { expiresIn: time });
  return token;
};

const getUserFromToken = async (token) => {
  if (token) {
    // token = token.split(" ")[1];
    const uid = jwt.decode(token).uid;
    const user = await User.findOne({ _id: uid }).catch((err) => {
      console.log("error in fetching user using token: ", err);
      return null;
    });
    return user;
  } else {
    return null;
  }
};

module.exports = {
  createToken,
  getUserFromToken,
};
