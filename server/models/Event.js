import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Event = sequelize.define("Event", {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  location: { type: DataTypes.STRING(255), allowNull: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  time: { type: DataTypes.STRING(50), allowNull: true },
  price: { type: DataTypes.DECIMAL(10,2), defaultValue: 0.0 },
  image: { type: DataTypes.STRING(512), allowNull: true },
  available_seats: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 }
});

