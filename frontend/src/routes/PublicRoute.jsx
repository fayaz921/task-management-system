import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../features/auth/store/authStore'
import { isAdminRole } from '../shared/utils/constants'

export default function PublicRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  
  if (isLoggedIn) {
    const user = useAuthStore.getState().user
    return <Navigate to={isAdminRole(user?.role) ? '/admin' : '/app'} replace />
  }
  
  return <></>
}
