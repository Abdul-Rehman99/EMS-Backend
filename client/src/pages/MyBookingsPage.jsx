// My Bookings Page
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import EventCard from '../components/EventCard';
import EventFormModal from '../components/modals/EventFormModal';
import BookingModal from '../components/modals/BookingModal';
import { useAuth } from '../context/AuthContext';

// API Base URL - Update this to your backend URL
const API_URL = 'http://localhost:8080/api';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Booking cancelled successfully');
        fetchBookings();
      }
    } catch (err) {
      alert('Error cancelling booking');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">My Bookings</h2>
        <p className="text-gray-600">Manage your event bookings</p>
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : bookings.length > 0 ? (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {booking.Event?.title || 'Event'}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {booking.Event?.date ? new Date(booking.Event.date).toLocaleDateString() : 'N/A'}
                    </div>
                    {booking.Event?.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {booking.Event.location}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Ticket className="w-4 h-4 mr-2" />
                      {booking.quantity} ticket(s)
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Booked on: {new Date(booking.booking_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="text-2xl font-bold text-purple-600">
                    ${parseFloat(booking.total_price).toFixed(2)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCancelBooking(booking.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Cancel Booking
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No bookings yet</p>
          <p className="text-gray-500 text-sm mt-2">Start booking events to see them here</p>
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;