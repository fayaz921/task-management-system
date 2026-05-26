import { useState } from 'react'
import api from '../../../lib/axios'

export default function useUpdateUserRole() {
  const [loading, setLoading] = useState(false)

  const updateUserRole = async (userId, role) => {
    setLoading(true)
    try {
      const response = await api.patch(`/Admin/users/${userId}/role`, { role: Number(role) })
      return response.data
    } finally {
      setLoading(false)
    }
  }

  return { updateUserRole, loading }
}