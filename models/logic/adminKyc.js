const User = require("../db/users");
const fetchKycPendingUsers = async () => {
  const result = await User.find();

  let returnObject = {};
  let allRequest = [];
  let totalApproved = 0;
  let totalRejected = 0;

  result.forEach((user) => {
    let obj = {};
    if (user.isKycVerified === false && user.kycStatus === "pending") {
      (obj.metamaskAccount = user.metamaskAccount),
        (obj.fullName = user.firstName + " " + user.lastName),
        (obj.aadhaarNumber = user.aadhaarNumber),
        (obj.panNumber = user.panNumber),
        (obj.income = user.income),
        (obj.occupation = user.occupation),
        (obj.about = user.about);
      allRequest.push(obj);
    }
  });
  returnObject.allRequest = allRequest;

  returnObject.totalCount = result.length;
  for (let i = 0; i < result.length; i++) {
    if (result[i].kycStatus === "rejected") totalRejected += 1;
    if (result[i].kycStatus === "approved") totalApproved += 1;
  }
  returnObject.totalApproved = totalApproved;
  returnObject.totalRejected = totalRejected;

  return returnObject;
};

// decision-> "true for approve, false for decline"
const kycStatusUpdate = async (decision, userMetamaskAccount) => {
  if (decision) {
    // approve,
    // status: pending -> approve, isVerified: true

    await User.findOneAndUpdate(
      { metamaskAccount: userMetamaskAccount },
      { $set: { kycStatus: "approved", isKycVerified: true } }
    );
  } else {
    // declined,
    // status: pending -> rejected, isVerified: false
    await User.findOneAndUpdate(
      { metamaskAccount: userMetamaskAccount },
      { $set: { kycStatus: "rejected", isKycVerified: false } }
    );
  }

  return { message: "kyc status updated" };
};

module.exports = {
  fetchKycPendingUsers,
  kycStatusUpdate,
};
