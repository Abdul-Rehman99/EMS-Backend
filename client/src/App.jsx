import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Ticket, LogOut, LayoutDashboard, Menu } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import UserEventsPage from './pages/UserEventsPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AuthPage from './pages/AuthPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminDashboard from './pages/admin/AdminDashboard';


const App = () => {
  const { user, logout, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('events');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Ticket className="w-16 h-16 text-white" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  const isAdmin = user.role === 'admin';

  const navigation = isAdmin
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'events', label: 'Manage Events', icon: Calendar },
      ]
    : [
        { id: 'events', label: 'Browse Events', icon: Calendar },
        { id: 'bookings', label: 'My Bookings', icon: Ticket },
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <Ticket className="w-8 h-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">EventHub</h1>
                <p className="text-xs text-gray-600">{isAdmin ? 'Admin Panel' : 'Book Your Experience'}</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-purple-100 text-purple-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="hidden md:flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                      currentPage === item.id
                        ? 'bg-purple-100 text-purple-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
                <div className="pt-2 border-t">
                  <p className="text-sm font-semibold text-gray-800 px-4">{user.name}</p>
                  <p className="text-xs text-gray-600 px-4 mb-2">{user.email}</p>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'dashboard' && isAdmin && <AdminDashboard />}
            {currentPage === 'events' && (isAdmin ? <AdminEventsPage /> : <UserEventsPage />)}
            {currentPage === 'bookings' && !isAdmin && <MyBookingsPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; 2025 EventHub. All rights reserved.</p>
            <p className="mt-1">Your Gateway to Amazing Events</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;