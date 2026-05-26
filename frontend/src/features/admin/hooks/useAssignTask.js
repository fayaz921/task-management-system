import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../lib/axios'

export default function useAssignTask() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const assignTask = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/Admin/tasks/assign', {
        ...data,
        status: Number(data.status),
        priority: Number(data.priority),
      })
      if (response.data.isSuccess) {
        navigate('/admin/tasks')
      } else {
        setError(response.data.message || 'Failed to assign task')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to assign task')
    } finally {
      setLoading(false)
    }
  }

  return { assignTask, loading, error }
}