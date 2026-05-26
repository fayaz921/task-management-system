import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../features/auth/store/authStore'
import { UserRole } from '../shared/utils/constants'

export default function AdminRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  
  if (user?.role !== UserRole.Admin) {
    return <Navigate to="/app" replace />
  }
  
  return <Outlet />
}