import { useState, useEffect } from 'react'
import api from '../../../lib/axios'

export default function useGetTaskById(id) {
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return
      setLoading(true)
      try {
        const response = await api.get(`/Tasks/${id}`)
        if (response.data.isSuccess) {
          setTask(response.data.data)
        } else {
          setError(response.data.message || 'Failed to load task')
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchTask()
  }, [id])

  return { task, loading, error }
}