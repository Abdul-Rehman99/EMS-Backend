import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { sequelize } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
// import generateDummyData from "./scripts/generateDummyData.js"

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Event Booking API is running"));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection established");
    // generateDummyData();
    // NOTE: sync should be used carefully in prod. Use migrations for production.
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } 
  catch (error) {
    console.error("Unable to connect to DB:", error);
    process.exit(1);
  }
})();
