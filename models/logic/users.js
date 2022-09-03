const config = require("../../config/auth.config");
const User = require("../db/users");
const { createToken } = require("./authTokens");

const checkUserAndReturnToken = async (address) => {
  const existingUser = await User.findOne({ address });

  if (existingUser) {
    // user exists in db
    // return new token
    let accessToken = createToken(
      { uid: existingUser._id },
      config.TOKEN.ACCESS_SECRET,
      config.TIME.jwtExpiration
    );
    return accessToken;
  } else {
    // user does not exists in database,
    // create user and return token

    const newUser = await User.create({
      address,
    });
    return newUser.save().then((result) => {
      let accessToken = createToken(
        { uid: result._id },
        config.TOKEN.ACCESS_SECRET,
        config.TIME.jwtExpiration
      );
      return accessToken;
    });
  }
};

const saveUserDetils = async (
  uid,
  firstName,
  lastName,
  email,
  phoneNumber,
  streetAddress,
  state,
  city,
  pincode
) => {
  const user = await User.findOne({ _id: uid });
  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.phoneNumber = phoneNumber;
  user.streetAddress = streetAddress;
  user.state = state;
  user.city = city;
  user.pincode = pincode;
  return user
    .save()
    .then((result) => {
      return { saved: true };
    })
    .catch((err) => {
      console.log("error while saving user details: ", err);
      return { saved: false };
    });
};

const fetchUserDetails = async (uid) => {
  const user = await User.findOne({ _id: uid });
  const userDetails = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    streetAddress: user.streetAddress,
    state: user.state,
    city: user.city,
    pincode: user.pincode,
  };
  return userDetails;
};

module.exports = {
  checkUserAndReturnToken,
  saveUserDetils,
  fetchUserDetails,
};
