const router = require("express").Router();
const ApproveRequest = require("../models/db/ApproveRequest");

router.post("/toggle", async (req, res) => {
  try {
    const { address, approved } = req.body;
    await ApproveRequest.findOneAndUpdate(
      { userAddress: address },
      { approved }
    );
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log("throwing error", err);
    res.status(400).json({ success: false, message: "unable to toggle" });
  }
});

router.post("/get-pending", async (_req, res) => {
  try {
    res
      .status(200)
      .json({
        success: true,
        result: await ApproveRequest.find({ approved: false }),
      });
  } catch (err) {
    console.log("throwing error", err);
    res.status(400).json({ success: false, message: "unable to get pending" });
  }
});

module.exports = router;
