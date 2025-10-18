import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Booking = sequelize.define("Booking", {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
  total_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  booking_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});
