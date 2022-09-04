const mongoose = require("mongoose");

exports.connect = () => {
  // Connecting to the database
  const url = process.env.prod
    ? process.env.MONGO_URI
    : "mongodb://localhost:27017/capstone";
  mongoose
    .connect(url)
    .then(() => console.log("Successfully connected to database"))
    .catch((err) => {
      console.log("Database Connection failed, exiting now...", "\n", err);
      process.exit(1);
    });
};
