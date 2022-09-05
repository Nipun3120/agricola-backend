const mongoose = require("mongoose");

exports.connect = async () => {
  // Connecting to the database
  const url =
    process.env.MONGO_URI
  await mongoose
    .connect(url)
    .catch((err) => {
      console.log("Database Connection failed, exiting now...", "\n", err);
      process.exit(1);
    });
  console.log("Successfully connected to database")
};
