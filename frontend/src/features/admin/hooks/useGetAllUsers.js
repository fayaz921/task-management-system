import { useState, useEffect } from 'react'
import api from '../../../lib/axios'

export default function useGetAllUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await api.get('/Admin/users')
      if (response.data.isSuccess) {
        setUsers(response.data.data)
      } else {
        setError(response.data.message || 'Failed to load users')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return { users, loading, error, refetch: fetchUsers }
}