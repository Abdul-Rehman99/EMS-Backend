import express from "express";
import { getAdminStats, getRevenueChart } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin stats endpoints
router.get("/stats", protect, admin, getAdminStats);
router.get("/stats/revenue-chart", protect, admin, getRevenueChart);

export default router;