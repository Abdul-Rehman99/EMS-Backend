import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'

export default function ManageEvents(){
  const [events, setEvents] = useState([])
  useEffect(()=>{(async()=>{try{const {data}=await api.get('/api/events'); setEvents(data.events||data)}catch(e){console.error(e)}})()},[])

  const remove = async (id) => {
    if(!confirm('Delete event?')) return
    try{await api.delete(`/api/events/${id}`); setEvents(events.filter(e=>e.id!==id))}catch(e){alert('Delete failed')}
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link to="/admin/events/new" className="bg-blue-600 text-white px-3 py-1 rounded">Add Event</Link>
      </div>
      <div className="space-y-3">
        {events.map(e=> (
          <div key={e.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{e.title}</div>
              <div className="text-sm">{e.date} • {e.location}</div>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/admin/events/${e.id}/edit`} className="text-sm text-blue-600">Edit</Link>
              <button onClick={()=>remove(e.id)} className="text-sm text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}