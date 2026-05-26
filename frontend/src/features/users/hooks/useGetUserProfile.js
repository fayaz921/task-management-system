import { useState, useEffect } from 'react'
import api from '../../../lib/axios'

export default function useGetUserProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const response = await api.get('/Users/profile')
        if (response.data.isSuccess) {
          setProfile(response.data.data)
        } else {
          setError(response.data.message || 'Failed to load profile')
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  return { profile, loading, error }
}