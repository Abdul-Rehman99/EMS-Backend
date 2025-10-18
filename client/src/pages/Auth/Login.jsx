import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      console.log(err?.response)
      alert(err?.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border p-2 rounded" />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-2 rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  )
}