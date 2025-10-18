import { User } from "./User.js";
import { Event } from "./Event.js";
import { Booking } from "./Booking.js";

// Associations
User.hasMany(Event, { foreignKey: "created_by", onDelete: "SET NULL" });
Event.belongsTo(User, { foreignKey: "created_by" });

User.hasMany(Booking, { foreignKey: "user_id", onDelete: "CASCADE" });
Booking.belongsTo(User, { foreignKey: "user_id" });

Event.hasMany(Booking, { foreignKey: "event_id", onDelete: "CASCADE" });
Booking.belongsTo(Event, { foreignKey: "event_id" });

export { User, Event, Booking };
