import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ---------------- REGISTER ----------------
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role: role || "patient",
  });

  await newUser.save();

  const token = jwt.sign(
    { id: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// ---------------- GET DOCTORS ----------------
router.get("/doctors", async (req, res) => {
  const doctors = await User.find({ role: "doctor" }).select("name email");
  res.json(doctors);
});

export default router;
