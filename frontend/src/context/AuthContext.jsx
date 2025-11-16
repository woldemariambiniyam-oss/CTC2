import { createContext, useState, useContext, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data)
    } catch (error) {
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const performLogin = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    const { token, user } = response.data
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(user)
    return response.data
  }

  const login = async (email, password) => {
    return performLogin(email, password)
  }

  const register = async (userData) => {
    // First create the trainee account
    await api.post('/auth/register', userData)
    // Then perform a real login so that a proper session is created server-side
    return performLogin(userData.email, userData.password)
  }

  const forgotPassword = async (email) => {
    const response = await api.post('/auth/password-reset/request', { email })
    return response.data
  }

  const verifyResetToken = async (token) => {
    const response = await api.get(`/auth/password-reset/verify/${token}`)
    return response.data
  }

  const resetPassword = async (token, password) => {
    const response = await api.post('/auth/password-reset/reset', { token, password })
    return response.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, forgotPassword, verifyResetToken, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


