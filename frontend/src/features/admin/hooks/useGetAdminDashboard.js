import { useEffect, useState } from 'react'
import api from '../../../lib/axios'

export default function useGetAdminDashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    const fetchDashboard = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await api.get('/Admin/dashboard')
        if (!ignore && response.data.isSuccess) {
          setData(response.data.data)
        } else if (!ignore) {
          setError(response.data.message || 'Failed to load dashboard')
        }
      } catch (err) {
        if (!ignore) setError(err.response?.data?.message || err.message || 'Failed to load dashboard')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchDashboard()

    return () => {
      ignore = true
    }
  }, [])

  return { data, loading, error }
}
