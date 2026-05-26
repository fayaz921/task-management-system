import axios from 'axios'
import { useAuthStore } from '../features/auth/store/authStore'

const api = axios.create({
  baseURL: 'https://localhost:7218/api',
})

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const { refreshToken, user } = useAuthStore.getState()
      const { logout, setAuth } = useAuthStore.getState()

      if (refreshToken) {
        try {
          const refreshApi = axios.create({ baseURL: 'https://localhost:7218/api' })
          const response = await refreshApi.post('/Auth/refresh-token', { refreshToken })
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.data
          setAuth(user, newAccessToken, newRefreshToken)
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return api(originalRequest)
        } catch (refreshError) {
          logout()
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      } else {
        logout()
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api