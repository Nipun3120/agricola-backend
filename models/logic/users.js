const config = require("../../config/auth.config");
const User = require("../db/users");
const { createToken } = require("./authTokens");

const checkUserAndReturnToken = async (address) => {
  const existingUser = await User.findOne({ metamaskAccount: address });

  if (existingUser) {
    // user exists in db
    // return new token
    let accessToken = createToken(
      { uid: existingUser._id },
      config.TOKEN.ACCESS_SECRET,
      config.TIME.jwtExpiration
    );
    const userDetails = extractUserDetails(existingUser);
    return { accessToken, userDetails };
  } else {
    // user does not exists in database,
    // create user and return token

    const newUser = await User.create({
      metamaskAccount: address,
    });
    return newUser.save().then((result) => {
      let accessToken = createToken(
        { uid: result._id },
        config.TOKEN.ACCESS_SECRET,
        config.TIME.jwtExpiration
      );
      const userDetails = extractUserDetails(result);
      return { accessToken, userDetails };
    });
  }
};

const updateUserDetails = async (
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
  const updateUpject = checkForNullValues(
    firstName,
    lastName,
    email,
    phoneNumber,
    streetAddress,
    state,
    city,
    pincode
  );
  const user = await User.findOneAndUpdate({ _id: uid }, updateUpject).catch(
    (err) => {
      console.log("error in updating user profile, err: ", err);
      return { saved: false };
    }
  );
  console.log(user);
  return { saved: true };
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

const checkForNullValues = (
  firstName,
  lastName,
  email,
  phoneNumber,
  streetAddress,
  state,
  city,
  pincode
) => {
  const queryObject = {};
  if (firstName.length) queryObject.firstName = firstName;
  if (lastName.length) queryObject.lastName = lastName;
  if (email.length) queryObject.email = email;
  if (phoneNumber.length) queryObject.phoneNumber = phoneNumber;
  if (streetAddress.length) queryObject.streetAddress = streetAddress;
  if (state.length) queryObject.state = state;
  if (city.length) queryObject.city = city;
  if (pincode.length) queryObject.pincode = pincode;
  console.log(queryObject);
  return queryObject;
};

const extractUserDetails = (obj) => {
  return {
    firstName: obj.firstName,
    lastName: obj.lastName,
    email: obj.email,
    phoneNumber: obj.phoneNumber,
    streetAddress: obj.streetAddress,
    state: obj.state,
    city: obj.city,
    pincode: obj.pincode,
  };
};

module.exports = {
  checkUserAndReturnToken,
  updateUserDetails,
  fetchUserDetails,
  extractUserDetails,
};
