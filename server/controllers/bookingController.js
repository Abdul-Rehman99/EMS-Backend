import asyncHandler from "express-async-handler";
import { Booking, Event } from "../models/index.js";
import { sequelize } from "../config/db.js";

/**
 * Create booking:
 * - validate quantity
 * - ensure enough seats (transaction)
 * - deduct seats and create booking in single transaction
 */
export const createBooking = asyncHandler(async (req, res) => {
  const { event_id, quantity } = req.body;
  const qty = Number(quantity) || 1;
  if (!event_id || qty <= 0) {
    res.status(400);
    throw new Error("Invalid event_id or quantity");
  }

  const t = await sequelize.transaction();
  try {
    const event = await Event.findByPk(event_id, { lock: true, transaction: t });
    if (!event) {
      await t.rollback();
      res.status(404);
      throw new Error("Event not found");
    }

    if (event.available_seats < qty) {
      await t.rollback();
      res.status(400);
      console.log("Hey!! Not enough available seats");
      throw new Error("Not enough available seats");
    }

    // compute total
    const totalPrice = Number(event.price) * qty;

    // create booking
    const booking = await Booking.create({
      event_id,
      user_id: req.user.id,
      quantity: qty,
      total_price: totalPrice
    }, { transaction: t });
    
    console.log("Booking", booking);

    // decrement seats
    event.available_seats = event.available_seats - qty;
    await event.save({ transaction: t });

    await t.commit();
    res.status(201).json(booking);
  } catch (err) {
    if (t) await t.rollback();
    throw err;
  }
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.findAll({
    where: { user_id: req.user.id },
    include: [{ model: Event }]
  });
  res.json(bookings);
});

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByPk(req.params.id);
  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }
  if (booking.user_id !== req.user.id && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to cancel this booking");
  }

  // restore seats inside transaction
  const t = await sequelize.transaction();
  try {
    const event = await Event.findByPk(booking.event_id, { transaction: t, lock: true });
    if (event) {
      event.available_seats = event.available_seats + booking.quantity;
      await event.save({ transaction: t });
    }
    await booking.destroy({ transaction: t });
    await t.commit();
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    if (t) await t.rollback();
    throw err;
  }
});
