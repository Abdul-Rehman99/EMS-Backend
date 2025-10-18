import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../models/index.js";
import dotenv from "dotenv";
dotenv.config();

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id, { attributes: { exclude: ["password"] } });
      if (!user) {
        res.status(401);
        throw new Error("User not found");
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("No token, authorization denied");
  }
});
