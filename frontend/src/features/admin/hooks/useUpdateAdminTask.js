import { useState } from 'react'
import api from '../../../lib/axios'

export default function useUpdateAdminTask() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateTask = async (id, data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.put(`/Admin/tasks/${id}`, {
        title: data.title,
        description: data.description,
        status: Number(data.status),
        priority: Number(data.priority),
        dueDate: data.dueDate,
      })
      if (!response.data.isSuccess) {
        setError(response.data.message || 'Failed to update task')
      }
      return response.data
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update task'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { updateTask, loading, error }
}
