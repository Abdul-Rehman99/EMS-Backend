import asyncHandler from "express-async-handler";
import { Op } from "sequelize";
import { User, Event, Booking } from "../models/index.js";
import { sequelize } from "../config/db.js";

/**
 * GET /api/admin/stats
 * Returns dashboard statistics for admin
 */
export const getAdminStats = asyncHandler(async (req, res) => {
  // Get total counts
  const totalUsers = await User.count({ where: { role: "user" } });
  const totalEvents = await Event.count();
  const totalBookings = await Booking.count();

  // Calculate total revenue
  const revenueResult = await Booking.findOne({
    attributes: [[sequelize.fn("SUM", sequelize.col("total_price")), "total"]],
    raw: true
  });
  const totalRevenue = parseFloat(revenueResult?.total || 0);

  // Get upcoming events count
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = await Event.count({
    where: { date: { [Op.gte]: today } }
  });

  // Get bookings for current month
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const monthlyBookings = await Booking.count({
    where: {
      booking_date: {
        [Op.between]: [firstDayOfMonth, lastDayOfMonth]
      }
    }
  });

  // Get monthly revenue
  const monthlyRevenueResult = await Booking.findOne({
    attributes: [[sequelize.fn("SUM", sequelize.col("total_price")), "total"]],
    where: {
      booking_date: {
        [Op.between]: [firstDayOfMonth, lastDayOfMonth]
      }
    },
    raw: true
  });
  const monthlyRevenue = parseFloat(monthlyRevenueResult?.total || 0);

  // Get top 5 events by bookings
  const topEvents = await Event.findAll({
    subQuery: false,
    attributes: [
      "id",
      "title",
      "date",
      "price",
      [sequelize.fn("COUNT", sequelize.col("Bookings.id")), "booking_count"],
      [sequelize.fn("SUM", sequelize.col("Bookings.quantity")), "total_tickets"],
      [sequelize.fn("SUM", sequelize.col("Bookings.total_price")), "revenue"]
    ],
    include: [{
      model: Booking,
      as: "Bookings",
      attributes: [],
      required: false
    }],
    group: ["Event.id"],
    order: [[sequelize.literal("booking_count"), "DESC"]],
    limit: 5,
    raw: true
  });


  // Recent bookings
  const recentBookings = await Booking.findAll({
    limit: 10,
    order: [["booking_date", "DESC"]],
    include: [
      {
        model: Event,
        attributes: ["id", "title", "date"]
      },
      {
        model: User,
        attributes: ["id", "name", "email"]
      }
    ]
  });

  // Calculate average booking value
  const avgBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

  // Get events by status
  const pastEvents = await Event.count({
    where: { date: { [Op.lt]: today } }
  });

  res.json({
    overview: {
      totalUsers,
      totalEvents,
      totalBookings,
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      upcomingEvents,
      pastEvents,
      avgBookingValue: parseFloat(avgBookingValue.toFixed(2))
    },
    monthly: {
      bookings: monthlyBookings,
      revenue: parseFloat(monthlyRevenue.toFixed(2))
    },
    topEvents: topEvents.map(e => ({
      id: e.id,
      title: e.title,
      date: e.date,
      price: parseFloat(e.price),
      bookingCount: parseInt(e.booking_count) || 0,
      totalTickets: parseInt(e.total_tickets) || 0,
      revenue: parseFloat(e.revenue || 0).toFixed(2)
    })),
    recentBookings: recentBookings.map(b => ({
      id: b.id,
      quantity: b.quantity,
      totalPrice: parseFloat(b.total_price),
      bookingDate: b.booking_date,
      event: b.Event ? {
        id: b.Event.id,
        title: b.Event.title,
        date: b.Event.date
      } : null,
      user: b.User ? {
        id: b.User.id,
        name: b.User.name,
        email: b.User.email
      } : null
    }))
  });
});

/**
 * GET /api/admin/stats/revenue-chart
 * Returns revenue data for the last 12 months
 */
export const getRevenueChart = asyncHandler(async (req, res) => {
  const months = [];
  const now = new Date();

  // Generate last 12 months
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const revenueResult = await Booking.findOne({
      attributes: [[sequelize.fn("SUM", sequelize.col("total_price")), "total"]],
      where: {
        booking_date: {
          [Op.between]: [firstDay, lastDay]
        }
      },
      raw: true
    });

    const bookingCount = await Booking.count({
      where: {
        booking_date: {
          [Op.between]: [firstDay, lastDay]
        }
      }
    });

    months.push({
      month: date.toLocaleString("en-US", { month: "short", year: "numeric" }),
      revenue: parseFloat(revenueResult?.total || 0).toFixed(2),
      bookings: bookingCount
    });
  }

  res.json({ data: months });
});