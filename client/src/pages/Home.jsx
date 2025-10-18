import { useEffect, useState } from 'react'
import api from '../utils/api'
import { Link } from 'react-router-dom'

export default function Home() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/events')
        setEvents(data.events || data)
      } catch (err) {
        console.error(err)
      } finally { setLoading(false) }
    })()
  }, [])

  if (loading) return <div>Loading events...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map(ev => (
          <div key={ev.id} className="bg-white rounded-lg shadow p-4">
            <img src={ev.image || '/placeholder.png'} alt="" className="h-40 w-full object-cover rounded" />
            <h3 className="mt-2 font-semibold">{ev.title}</h3>
            <p className="text-sm">{ev.location} • {ev.date}</p>
            <div className="mt-3 flex justify-between items-center">
              <div className="text-lg font-semibold">₹{ev.price}</div>
              <Link to={`/events/${ev.id}`} className="text-sm text-blue-600">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}