import { Link } from 'react-router-dom'

export default function AdminDashboard(){
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/events" className="bg-white p-4 rounded shadow">Manage Events</Link>
        <div className="bg-white p-4 rounded shadow">Bookings (use API)</div>
        <div className="bg-white p-4 rounded shadow">Stats (optional)</div>
      </div>
    </div>
  )
}