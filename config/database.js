const mongoose = require("mongoose");

exports.connect = async () => {
  // Connecting to the database
  const url =
    process.env.prod === true
      ? process.env.MONGO_URI
      : "mongodb://localhost:27017/capstone";
  console.log(url);
  mongoose
    .connect(process.env.MONGO_URI || "mongodb://localhost:27017/capstone")
    .catch((err) => {
      console.log("Database Connection failed, exiting now...", "\n", err);
      process.exit(1);
    });
  console.log("Successfully connected to database");
};
