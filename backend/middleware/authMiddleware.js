import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Middleware to verify JWT
export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Middleware to check membership
export const isMember = (req, res, next) => {
  if (!req.user || !req.user.isMember) {
    return res
      .status(403)
      .json({ message: "Only members can perform this action" });
  }
  next();
};

// Middleware to check admin role
export const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "Only admins can perform this action" });
  }
  next();
};
