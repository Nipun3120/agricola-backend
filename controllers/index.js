const cors = require("cors");
const express = require("express");
const router = express.Router();
router.use(cors());

router.use("/user", require("./users"));
router.use("/admin", require("./adminKyc"));
router.use("/admin-user", require("./approveRequests"));

// default
router.get("/", function (req, res) {
  res.json({
    status: "Server responding",
  });
});

module.exports = router;
