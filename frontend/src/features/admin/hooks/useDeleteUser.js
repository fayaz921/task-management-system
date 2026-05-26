import { useState } from 'react'
import api from '../../../lib/axios'

export default function useDeleteUser() {
  const [loading, setLoading] = useState(false)

  const deleteUser = async (userId) => {
    setLoading(true)
    try {
      const response = await api.delete(`/Admin/users/${userId}`)
      return response.data
    } finally {
      setLoading(false)
    }
  }

  return { deleteUser, loading }
}