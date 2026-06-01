import { useState } from 'react'
import api from '../../../lib/axios'

export default function useDeleteAdminTask() {
  const [loading, setLoading] = useState(false)

  const deleteTask = async (id) => {
    setLoading(true)
    try {
      const response = await api.delete(`/Admin/tasks/${id}`)
      return response.data
    } finally {
      setLoading(false)
    }
  }

  return { deleteTask, loading }
}
