import { useState } from 'react'
import api from '../../../lib/axios'
import { useAuthStore } from '../../auth/store/authStore'

export default function useUpdateUserProfile() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const setAuth = useAuthStore((state) => state.setAuth)
  const user = useAuthStore((state) => state.user)

  const updateProfile = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.put('/Users/profile', data)
      if (response.data.isSuccess) {
        const updatedUser = response.data.data
        setAuth(
          { ...user, ...updatedUser },
          useAuthStore.getState().accessToken,
          useAuthStore.getState().refreshToken
        )
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(response.data.message || 'Failed to update profile')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return { updateProfile, loading, error, success }
}