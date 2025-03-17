const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db.js");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middleware/authMiddleware.js");
const dotenv = require("dotenv");

dotenv.config();

console.log("Passcode from .env:", process.env.MEMBERSHIP_PASSCODE);

const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into DB
    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, hashedPassword]
    );

    // Generate JWT Token
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, user: newUser.rows[0] });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare hashed password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user.rows[0].id,
        isMember: user.rows[0].is_member,
        isAdmin: user.rows[0].is_admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return token and user details
    res.json({
      token,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        isMember: user.rows[0].is_member,
        isAdmin: user.rows[0].is_admin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Join the Club (Upgrade to Member)
router.post("/join", verifyToken, async (req, res) => {
  const { passcode } = req.body;
  const userId = req.user.id;

  if (passcode !== process.env.MEMBERSHIP_PASSCODE) {
    return res.status(403).json({ message: "Incorrect passcode" });
  }

  try {
    await pool.query("UPDATE users SET is_member = true WHERE id = $1", [
      userId,
    ]);
    res.json({ message: "Welcome to the club! You are now a member." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Upgrade to Admin
router.post("/become-admin", verifyToken, async (req, res) => {
  const { passcode } = req.body;
  const userId = req.user.id;

  if (passcode !== process.env.ADMIN_PASSCODE) {
    return res.status(403).json({ message: "Incorrect admin passcode" });
  }

  try {
    await pool.query("UPDATE users SET is_admin = true WHERE id = $1", [
      userId,
    ]);
    res.json({ message: "You are now an admin!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
