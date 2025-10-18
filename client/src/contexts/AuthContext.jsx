import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../utils/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null
    } catch { return null }
  })

  useEffect(() => {
    if (user?.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      delete api.defaults.headers.common['Authorization']
      localStorage.removeItem('user')
    }
  }, [user])

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password })
    setUser(data)
    return data
  }

  const register = async (name, email, password) => {
    const { data } = await api.post('/api/auth/register', { name, email, password })
    setUser(data)
    return data
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)