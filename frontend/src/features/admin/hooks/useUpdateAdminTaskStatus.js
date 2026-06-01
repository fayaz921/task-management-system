import { useState } from 'react'
import api from '../../../lib/axios'

export default function useUpdateAdminTaskStatus() {
  const [loading, setLoading] = useState(false)

  const updateStatus = async (id, status) => {
    setLoading(true)
    try {
      const response = await api.patch(`/Admin/tasks/${id}/status`, {
        status: Number(status),
      })
      return response.data
    } finally {
      setLoading(false)
    }
  }

  return { updateStatus, loading }
}
