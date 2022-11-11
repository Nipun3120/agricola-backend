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
  const updateObject = checkForNullValues(
    firstName,
    lastName,
    email,
    phoneNumber,
    streetAddress,
    state,
    city,
    pincode
  );
  const user = await User.findOneAndUpdate({ _id: uid }, updateObject).catch(
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
    aadhaarNumber: user.aadhaarNumber,
    panNumber: user.panNumber,
    income: user.income,
    occupation: user.occupation,
    about: user.about,
    isKycVerified: user.isKycVerified,
    kycStatus: user.kycStatus,
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
  pincode,
  aadhaarNumber,
  panNumber,
  income,
  occupation,
  about
) => {
  const queryObject = {};
  if (firstName && firstName.length) queryObject.firstName = firstName;
  if (lastName && lastName.length) queryObject.lastName = lastName;
  if (email && email.length) queryObject.email = email;
  if (phoneNumber && phoneNumber.length) queryObject.phoneNumber = phoneNumber;
  if (streetAddress && streetAddress.length)
    queryObject.streetAddress = streetAddress;
  if (state && state.length) queryObject.state = state;
  if (city && city.length) queryObject.city = city;
  if (pincode && pincode.length) queryObject.pincode = pincode;
  if (aadhaarNumber && aadhaarNumber.length)
    queryObject.aadhaarNumber = aadhaarNumber;
  if (panNumber && panNumber.length) queryObject.panNumber = panNumber;
  if (income && income.length) queryObject.income = income;
  if (occupation && occupation.length) queryObject.occupation = occupation;
  if (about && about.length) queryObject.about = about;
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
    aadhaarNumber: obj.aadhaarNumber,
    panNumber: obj.panNumber,
    income: obj.income,
    occupation: obj.occupation,
    about: obj.about,
    isKycVerified: obj.isKycVerified,
    kycStatus: obj.kycStatus,
  };
};

const updateKycDetails = async (
  metamaskAccount,
  aadhaarNumber,
  panNumber,
  income,
  occupation,
  about
) => {
  const updateObject = checkForNullValues(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    aadhaarNumber,
    panNumber,
    income,
    occupation,
    about
  );
  updateObject.kycStatus = "pending";
  console.log("metamaskAccount: ", metamaskAccount);
  const user = await User.findOneAndUpdate(
    { metamaskAccount: metamaskAccount },
    updateObject
  ).catch((err) => {
    console.log("error in updating user profile, err: ", err);
    return { saved: false };
  });
  console.log("user after updation: ", user);
  return { saved: true };
};

module.exports = {
  checkUserAndReturnToken,
  updateUserDetails,
  fetchUserDetails,
  extractUserDetails,
  updateKycDetails,
};
