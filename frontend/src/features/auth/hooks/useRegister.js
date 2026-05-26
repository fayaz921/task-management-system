import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../lib/axios'

export default function useRegister() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const register = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/Auth/register', data)
      if (response.data.isSuccess) {
        navigate('/login')
      } else {
        setError(response.data.message || 'Registration failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return { register, loading, error }
}