const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      res.status(200).json({
        "message":"Server Running"
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
