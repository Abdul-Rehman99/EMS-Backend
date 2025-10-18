import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      alert(err?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="w-full border p-2 rounded" />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 rounded" />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 rounded" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Create account</button>
      </form>
    </div>
  )
}