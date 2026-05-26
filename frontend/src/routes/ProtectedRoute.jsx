import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../features/auth/store/authStore'

export default function ProtectedRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  
  return <Outlet />
}