const express = require("express");
const pool = require("../db.js");
const {
  verifyToken,
  isMember,
  isAdmin,
} = require("../middleware/authMiddleware.js");

const router = express.Router();

// Create a message (Only for members)
router.post("/", verifyToken, isMember, async (req, res) => {
  const { title, content } = req.body;
  const authorId = req.user.id;

  try {
    const newMessage = await pool.query(
      "INSERT INTO messages (title, content, author_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, authorId]
    );
    res.status(201).json(newMessage.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all messages (Show author name only to members)
router.get("/", async (req, res) => {
  try {
    const messages = await pool.query(
      `SELECT messages.id, messages.title, messages.content, messages.timestamp, 
       users.first_name || ' ' || users.last_name AS author_name
       FROM messages
       JOIN users ON messages.author_id = users.id`
    );

    res.json(messages.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete message (Only for admins)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  const messageId = req.params.id;

  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
