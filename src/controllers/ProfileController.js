const express = require("express");
const router = express.Router();
const UserService = require("../services/UserService");
const verifyToken = require("./../middlewares/auth");

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await UserService.findUser(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
