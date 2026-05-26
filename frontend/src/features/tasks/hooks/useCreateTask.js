import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../lib/axios'
import { TaskStatus, TaskPriority } from '../../../shared/utils/constants'

export default function useCreateTask() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const createTask = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/Tasks', {
        title: data.title,
        description: data.description,
        status: Number(data.status),
        priority: Number(data.priority),
        dueDate: data.dueDate,
      })
      if (response.data.isSuccess) {
        navigate('/app/tasks')
      } else {
        setError(response.data.message || 'Failed to create task')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create task')
    } finally {
      setLoading(false)
    }
  }

  return { createTask, loading, error }
}