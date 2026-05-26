import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../lib/axios'

export default function useResetPassword() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const resetPassword = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/Auth/reset-password', data)
      if (response.data.isSuccess) {
        navigate('/login')
      } else {
        setError(response.data.message || 'Password reset failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Password reset failed')
    } finally {
      setLoading(false)
    }
  }

  return { resetPassword, loading, error }
}