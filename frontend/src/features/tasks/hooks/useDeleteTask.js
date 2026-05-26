import { useState } from 'react'
import api from '../../../lib/axios'

export default function useDeleteTask() {
  const [loading, setLoading] = useState(false)

  const deleteTask = async (id) => {
    setLoading(true)
    try {
      const response = await api.delete(`/Tasks/${id}`)
      return response.data.isSuccess
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { deleteTask, loading }
}