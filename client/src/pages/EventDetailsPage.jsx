import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ChevronLeft, Edit, Trash2 } from 'lucide-react';

const API_URL = 'http://localhost:8080/api';

const EventDetailsPage = ({ eventId, onBack, onBook, onEdit, onDelete, isAdmin }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/events/${eventId}`);
      const data = await res.json();
      setEvent(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
          <div className="h-96 bg-gray-300 rounded-lg mb-6"></div>
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Event not found</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Events
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="h-96 bg-gradient-to-br from-purple-400 to-pink-400 relative overflow-hidden">
          {event.image ? (
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Calendar className="w-32 h-32 text-white opacity-50" />
            </div>
          )}
          {event.available_seats === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-2xl">
                Sold Out
              </span>
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{event.title}</h1>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-purple-600">${event.price}</span>
                <span className="text-gray-500">per ticket</span>
              </div>
            </div>
            {isAdmin ? (
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEdit(event)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  <Edit className="w-5 h-5" />
                  Edit Event
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDelete(event.id)}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Event
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onBook(event)}
                disabled={event.available_seats === 0}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {event.available_seats === 0 ? 'Sold Out' : 'Book Now'}
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Event Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                {event.time && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Time</p>
                      <p className="font-semibold text-gray-800">{event.time}</p>
                    </div>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-800">{event.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-pink-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-pink-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Available Seats</p>
                    <p className="font-semibold text-gray-800 text-2xl">{event.available_seats}</p>
                  </div>
                </div>
                <div className="mt-4 bg-white rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-bold ${event.available_seats > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {event.available_seats > 0 ? 'Available' : 'Sold Out'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {event.description && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-3 text-lg">About This Event</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetailsPage;