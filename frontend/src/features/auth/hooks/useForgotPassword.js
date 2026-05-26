import { useState } from 'react'
import api from '../../../lib/axios'

export default function useForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const forgotPassword = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/Auth/forgot-password', data)
      if (response.data.isSuccess) {
        setSuccess(true)
      } else {
        setError(response.data.message || 'Failed to send reset email')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return { forgotPassword, loading, error, success }
}