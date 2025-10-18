import bcrypt from "bcrypt";
import { sequelize } from "../config/db.js";
import { User, Event } from "../models/index.js";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    await sequelize.sync({ alter: true });

    const adminEmail = "admin@example.com";
    let admin = await User.findOne({ where: { email: adminEmail } });
    if (!admin) {
      admin = await User.create({
        name: "Admin",
        email: adminEmail,
        password: await bcrypt.hash("password123", 10),
        role: "admin"
      });
      console.log("Created admin:", adminEmail);
    }

    const ev = await Event.findOne({ where: { title: "Sample Concert" } });
    if (!ev) {
      await Event.create({
        title: "Sample Concert",
        description: "An example event",
        location: "Gwalior",
        date: "2025-12-01",
        time: "18:00",
        price: 499.00,
        available_seats: 100,
        created_by: admin.id
      });
      console.log("Created sample event");
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
