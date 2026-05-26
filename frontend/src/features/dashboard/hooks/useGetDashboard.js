import { useState, useEffect } from 'react'
import api from '../../../lib/axios'

export default function useGetDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true)
      try {
        const response = await api.get('/Dashboard')
        if (response.data.isSuccess) {
          setData(response.data.data)
        } else {
          setError(response.data.message || 'Failed to load dashboard')
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  return { data, loading, error }
}