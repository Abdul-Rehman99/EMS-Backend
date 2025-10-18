import { useEffect, useState } from 'react'
import api from '../utils/api'

export default function MyBookings() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/bookings')
        setBookings(data)
      } catch (err) { console.error(err) }
    })()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      <div className="space-y-3">
        {bookings.length === 0 && <div>No bookings yet</div>}
        {bookings.map(b => (
          <div key={b.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{b.Event?.title || 'Event'}</div>
                <div className="text-sm">Qty: {b.quantity} • ₹{b.total_price}</div>
              </div>
              <div className="text-sm text-gray-600">{new Date(b.booking_date).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}