import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import EventDetails from './pages/EventDetails'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import MyBookings from './pages/MyBookings'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddEditEvent from './pages/admin/AddEditEvent'
import ManageEvents from './pages/admin/ManageEvents'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import { useAuth } from './contexts/AuthContext'
import { useEffect } from 'react'

export default function App() {
  const { user, logout } = useAuth()
  useEffect(() => console.log("User", user), [])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold">EventBook</Link>
          <div className="flex items-center gap-4">
            <Link to="/">Events</Link>
            {user ? (
              <>
                <Link to="/bookings">My Bookings</Link>
                {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
                <button onClick={logout} className="text-sm text-red-600">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register" className="ml-2">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />

          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/events" element={<AdminRoute><ManageEvents /></AdminRoute>} />
          <Route path="/admin/events/new" element={<AdminRoute><AddEditEvent /></AdminRoute>} />
          <Route path="/admin/events/:id/edit" element={<AdminRoute><AddEditEvent edit /></AdminRoute>} />
        </Routes>
      </main>
    </div>
  )
}