import { useState } from 'react'
import api from '../../../lib/axios'

export default function useRestoreTask() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const restoreTask = async (id) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.patch(`/Admin/tasks/${id}/restore`)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { restoreTask, loading, error }
}