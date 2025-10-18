import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, email and password");
  }
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    res.status(400);
    throw new Error("Email already registered");
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user)
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user)
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = req.user;
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});
