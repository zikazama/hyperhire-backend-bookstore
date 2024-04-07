const express = require("express");
const router = express.Router();
const UserService = require("../services/UserService");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserService.authenticateUser(username, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { username, fullname, email, password } = req.body;
  try {
    const user = await UserService.createUser(
      username,
      fullname,
      email,
      password
    );
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
      },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/users", async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = await UserService.createUser(username, email);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
