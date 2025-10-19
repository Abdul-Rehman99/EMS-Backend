import asyncHandler from "express-async-handler";
import { Op } from "sequelize";
import { Event, Booking } from "../models/index.js";

/**
 * GET /api/events
 * supports: ?page=1&limit=10&search=keyword&date=2025-01-01&location=city
 */
export const listEvents = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const offset = (page - 1) * limit;
  const { search, date, location } = req.query;

  const where = {};
  if (search) {
    where[Op.or] = [
      { title: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } }
    ];
  }
  if (date) where.date = date;
  if (location) where.location = { [Op.like]: `%${location}%` };

  const { count, rows } = await Event.findAndCountAll({
    where,
    order: [["date", "ASC"]],
    limit,
    offset
  });

  res.json({
    total: count,
    page,
    pages: Math.ceil(count / limit),
    events: rows
  });
});

export const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  res.json(event);
});

export const createEvent = asyncHandler(async (req, res) => {
  const { title, description, location, date, time, price, image, available_seats } = req.body;
  if (!title || !date) {
    res.status(400);
    throw new Error("Title and date are required");
  }
  const event = await Event.create({
    title,
    description,
    location,
    date,
    time,
    price: price || 0,
    image: image || null,
    available_seats: available_seats || 0,
    created_by: req.user.id
  });
  res.status(201).json(event);
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  const permitted = ["title","description","location","date","time","price","image","available_seats"];
  permitted.forEach((key) => {
    if (req.body[key] !== undefined) event[key] = req.body[key];
  });
  await event.save();
  res.json(event);
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  if (!event) {
    res.status(404);
    throw new Error("Event not found");
  }
  await event.destroy();
  res.json({ message: "Event deleted" });
});

export const getEventBookings = asyncHandler(async (req, res) => {
  const eventId = req.params.eventId;
  const bookings = await Booking.findAll({ where: { event_id: eventId } });
  res.json(bookings);
});


