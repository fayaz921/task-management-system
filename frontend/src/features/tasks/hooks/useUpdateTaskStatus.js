import { useState } from 'react'
import api from '../../../lib/axios'

export default function useUpdateTaskStatus() {
  const [loading, setLoading] = useState(false)

  const updateStatus = async (id, status) => {
    setLoading(true)
    try {
      const response = await api.patch(`/Tasks/${id}/status`, {
        status: Number(status),
      })
      return response.data
    } catch (err) {
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { updateStatus, loading }
}