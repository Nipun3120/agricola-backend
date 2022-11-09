const User = require("../db/users");
const fetchKycPendingUsers = async () => {
  // const users = find
  const pendingUsers = await User.find({ kycStatus: "incomplete" });

  console.log("usersssss: ", pendingUsers);
  return pendingUsers;
};

module.exports = {
  fetchKycPendingUsers,
};
