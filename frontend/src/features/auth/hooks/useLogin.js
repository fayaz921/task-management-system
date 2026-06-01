import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../lib/axios'
import { useAuthStore } from '../store/authStore'
import { isAdminRole } from '../../../shared/utils/constants'

const decodeJWT = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return {
      id: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
      fullName: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
      email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
      role: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
    }
  } catch {
    return null
  }
}

export default function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const login = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/Auth/login', data)
      if (response.data.isSuccess) {
        const { accessToken, refreshToken } = response.data.data
        const userData = decodeJWT(accessToken)
        setAuth(userData, accessToken, refreshToken)
        if (isAdminRole(userData?.role)) {
          navigate('/admin')
        } else {
          navigate('/app')
        }
      } else {
        setError(response.data.message || 'Login failed')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}
