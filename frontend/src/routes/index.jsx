import { Navigate, useRoutes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import AuthLayout from '../layouts/AuthLayout'
import UserLayout from '../layouts/UserLayout'
import AdminLayout from '../layouts/AdminLayout'

import LandingPage from '../features/landing/pages/LandingPage'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage'
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage'
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage'

/* Placeholder for sub-pages that aren't the main dashboard */
function Placeholder({ title }) {
  return (
    <div style={{ padding: '2rem 0' }}>
      <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.5rem' }}>{title}</h2>
      <p style={{ color: 'var(--muted-foreground)' }}>This page is under construction.</p>
    </div>
  )
}

export default function AppRoutes() {
  return useRoutes([
    {
      element: <PublicLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        { path: '/login', element: <LoginPage /> },
        { path: '/register', element: <RegisterPage /> },
        { path: '/forgot-password', element: <ForgotPasswordPage /> },
        { path: '/reset-password', element: <ResetPasswordPage /> },
      ],
    },
    {
      path: '/app',
      element: <UserLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'tasks', element: <Placeholder title="My Tasks" /> },
        { path: 'inbox', element: <Placeholder title="Inbox" /> },
        { path: 'today', element: <Placeholder title="Today" /> },
        { path: 'starred', element: <Placeholder title="Starred" /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboardPage /> },
        { path: 'users', element: <Placeholder title="All Users" /> },
        { path: 'tasks', element: <Placeholder title="All Tasks" /> },
        { path: 'deleted', element: <Placeholder title="Deleted Tasks" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ])
}
