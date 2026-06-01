import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../lib/axios'
import { useAuthStore } from '../store/authStore'

export default function useLogout() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const signOut = async () => {
    setLoading(true)
    try {
      await api.post('/Auth/logout')
    } catch (err) {
      console.warn('Logout request failed:', err)
    } finally {
      logout()
      setLoading(false)
      navigate('/login', { replace: true })
    }
  }

  return { signOut, loading }
}
