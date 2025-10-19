import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, Edit, Trash2 } from "lucide-react";

const EventCard = ({ event, onBook, onEdit, onDelete, isAdmin, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer relative"
    >
      <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 relative overflow-hidden">
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Calendar className="w-20 h-20 text-white opacity-50" />
          </div>
        )}
        {event.available_seats === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description || "No description available"}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-purple-500" />
            {new Date(event.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          {event.time && (
            <div className="flex items-center text-gray-600 text-sm">
              <Clock className="w-4 h-4 mr-2 text-purple-500" />
              {event.time}
            </div>
          )}
          {event.location && (
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2 text-purple-500" />
              {event.location}
            </div>
          )}
          <div className="flex items-center text-gray-600 text-sm">
            <Users className="w-4 h-4 mr-2 text-purple-500" />
            {event.available_seats} seats available
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-600">
            ${event.price}
          </span>
          {isAdmin ? (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(event);
                }}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(event.id);
                }}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation(); // ADD THIS LINE
                onBook(event);
              }}
              disabled={event.available_seats === 0}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Now
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
