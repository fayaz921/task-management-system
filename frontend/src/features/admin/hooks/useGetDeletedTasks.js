import { useState, useEffect } from 'react'
import api from '../../../lib/axios'

export default function useGetDeletedTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchDeletedTasks = async () => {
    setLoading(true)
    try {
      const response = await api.get('/Admin/tasks/deleted')
      if (response.data.isSuccess) {
        setTasks(response.data.data)
      } else {
        setError(response.data.message || 'Failed to load deleted tasks')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeletedTasks()
  }, [])

  return { tasks, loading, error, refetch: fetchDeletedTasks }
}