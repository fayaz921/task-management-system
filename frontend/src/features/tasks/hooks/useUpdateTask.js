import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../lib/axios'

export default function useUpdateTask() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const updateTask = async (id, data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.put(`/Tasks/${id}`, {
        title: data.title,
        description: data.description,
        status: Number(data.status),
        priority: Number(data.priority),
        dueDate: data.dueDate,
      })
      if (response.data.isSuccess) {
        navigate(`/app/tasks/${id}`)
      } else {
        setError(response.data.message || 'Failed to update task')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update task')
    } finally {
      setLoading(false)
    }
  }

  return { updateTask, loading, error }
}