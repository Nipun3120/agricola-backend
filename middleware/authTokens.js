const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const { TokenExpiredError } = jwt;

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  // access token from client
  token = token.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .send({ message: "Unauthorized, please login first" });
  }
  jwt.verify(token, config.TOKEN.ACCESS_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "User not Authenticated, Logout and Login again" });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  verifyToken,
};
