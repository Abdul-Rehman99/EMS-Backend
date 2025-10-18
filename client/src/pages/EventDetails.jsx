import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../contexts/AuthContext'

export default function EventDetails() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [qty, setQty] = useState(1)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/api/events/${id}`)
        setEvent(data)
      } catch (err) { console.error(err) }
    })()
  }, [id])

  const book = async () => {
    if (!user) return navigate('/login')
    try {
      await api.post('/api/bookings', { event_id: id, quantity: qty })
      alert('Booked successfully')
      navigate('/bookings')
    } catch (err) {
      alert(err?.response?.data?.message || 'Booking failed')
    }
  }

  if (!event) return <div>Loading...</div>

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <img src={event.image || '/placeholder.png'} alt="" className="w-full h-64 object-cover rounded" />
      <h2 className="text-2xl font-bold mt-4">{event.title}</h2>
      <p className="text-sm mt-1">{event.location} • {event.date} {event.time}</p>
      <p className="mt-4">{event.description}</p>
      <div className="mt-4 flex items-center gap-4">
        <div>
          <label className="block text-sm">Quantity</label>
          <input type="number" min="1" max={event.available_seats} value={qty} onChange={e=>setQty(e.target.value)} className="border p-2 rounded w-24" />
        </div>
        <div className="text-lg font-semibold">Total: ₹{(event.price * qty).toFixed(2)}</div>
        <button onClick={book} className="ml-auto bg-blue-600 text-white px-4 py-2 rounded">Book Now</button>
      </div>
    </div>
  )
}