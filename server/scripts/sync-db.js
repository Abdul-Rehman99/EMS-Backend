import { sequelize } from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected. Syncing...");
    await sequelize.sync({ alter: true });
    console.log("✅ DB synced");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
