import { useState, useEffect } from 'react'
import api from '../../../lib/axios'

export default function useGetAllTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await api.get('/Admin/tasks')
      if (response.data.isSuccess) {
        setTasks(response.data.data)
      } else {
        setError(response.data.message || 'Failed to load tasks')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return { tasks, loading, error, refetch: fetchTasks }
}