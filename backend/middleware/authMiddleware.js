const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Removes "Bearer"

  if (!token) return res.status(401).json({ message: "Access Denied" });

  console.log("TOKEN RECEIVED:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    console.log("TOKEN RECEIVED:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Middleware to check membership
const isMember = (req, res, next) => {
  if (!req.user || !req.user.isMember) {
    return res
      .status(403)
      .json({ message: "Only members can perform this action" });
  }
  next();
};

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Only admins can perform this action" });
  }
  next();
};

// Export all middlewares
module.exports = { verifyToken, isMember, isAdmin };
