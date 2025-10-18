import express from "express";
import {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventBookings
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", listEvents);
router.get("/:id", getEventById);

// admin routes
router.post("/", protect, admin, createEvent);
router.put("/:id", protect, admin, updateEvent);
router.delete("/:id", protect, admin, deleteEvent);
router.get("/:eventId/bookings", protect, admin, getEventBookings);

export default router;
