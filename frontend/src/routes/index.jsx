import { Navigate, useRoutes } from 'react-router-dom'
import LandingPage from '../features/landing/pages/LandingPage'
import AdminLayout from '../layouts/AdminLayout'
import PublicLayout from '../layouts/PublicLayout'
import UserLayout from '../layouts/UserLayout'

export default function AppRoutes() {
  return useRoutes([
    {
      element: <PublicLayout />,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
      ],
    },
    {
      path: '/app',
      element: <UserLayout />,
    },
    {
      path: '/admin',
      element: <AdminLayout />,
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ])
}
