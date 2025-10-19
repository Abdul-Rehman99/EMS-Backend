import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Ticket, TrendingUp, DollarSign, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// API Base URL - Update this to your backend URL
const API_URL = 'http://localhost:8080/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="h-20 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">Overview of your event booking platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-10 h-10 opacity-80" />
            <span className="text-xs font-semibold bg-white/30 text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/20 shadow-sm">
              Total
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">${stats?.overview.totalRevenue || 0}</h3>
          <p className="text-purple-100 text-sm">Total Revenue</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Ticket className="w-10 h-10 opacity-80" />
            <span className="text-xs font-semibold bg-white/30 text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/20 shadow-sm">
              All Time
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats?.overview.totalBookings || 0}</h3>
          <p className="text-pink-100 text-sm">Total Bookings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-10 h-10 opacity-80" />
            <span className="text-xs font-semibold bg-white/30 text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/20 shadow-sm">
              Active
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats?.overview.upcomingEvents || 0}</h3>
          <p className="text-orange-100 text-sm">Upcoming Events</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <User className="w-10 h-10 opacity-80" />
            <span className="text-xs font-semibold bg-white/30 text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/20 shadow-sm">
              Registered
            </span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats?.overview.totalUsers || 0}</h3>
          <p className="text-blue-100 text-sm">Total Users</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">This Month</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-800">${stats?.monthly.revenue || 0}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Bookings</p>
                  <p className="text-2xl font-bold text-gray-800">{stats?.monthly.bookings || 0}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Events</span>
              <span className="font-bold text-gray-800">{stats?.overview.totalEvents || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Past Events</span>
              <span className="font-bold text-gray-800">{stats?.overview.pastEvents || 0}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Avg Booking Value</span>
              <span className="font-bold text-gray-800">${stats?.overview.avgBookingValue || 0}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">Top Performing Events</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Event</th>
                <th className="text-left py-3 px-4 text-gray-600 font-semibold">Date</th>
                <th className="text-center py-3 px-4 text-gray-600 font-semibold">Bookings</th>
                <th className="text-center py-3 px-4 text-gray-600 font-semibold">Tickets</th>
                <th className="text-right py-3 px-4 text-gray-600 font-semibold">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {stats?.topEvents?.map((event, index) => (
                <tr key={event.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium">{event.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center font-semibold">{event.bookingCount}</td>
                  <td className="py-3 px-4 text-center font-semibold">{event.totalTickets}</td>
                  <td className="py-3 px-4 text-right font-bold text-purple-600">${event.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Bookings</h3>
        <div className="space-y-3">
          {stats?.recentBookings?.slice(0, 5).map((booking) => (
            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{booking.event?.title || 'N/A'}</p>
                <p className="text-sm text-gray-600">{booking.user?.name} - {booking.user?.email}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600">${parseFloat(booking.totalPrice).toFixed(2)}</p>
                <p className="text-xs text-gray-500">{booking.quantity} ticket(s)</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;