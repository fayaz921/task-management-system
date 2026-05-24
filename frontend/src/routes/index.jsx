import { Navigate, useRoutes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import AuthLayout from '../layouts/AuthLayout'
import UserLayout from '../layouts/UserLayout'
import AdminLayout from '../layouts/AdminLayout'

import LandingPage from '../features/landing/pages/LandingPage'
import WhyUsPage from '../features/landing/pages/WhyUsPage'
import PricingPage from '../features/landing/pages/PricingPage'
import LoginPage from '../features/auth/pages/LoginPage'
import RegisterPage from '../features/auth/pages/RegisterPage'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage'
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage'
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import TaskListPage from '../features/tasks/pages/TaskListPage'
import CreateTaskPage from '../features/tasks/pages/CreateTaskPage'
import TaskDetailPage from '../features/tasks/pages/TaskDetailPage'
import EditTaskPage from '../features/tasks/pages/EditTaskPage'
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage'
import AdminUsersPage from '../features/admin/pages/AdminUsersPage'
import AdminTasksPage from '../features/admin/pages/AdminTasksPage'
import AdminDeletedTasksPage from '../features/admin/pages/AdminDeletedTasksPage'
import AdminAssignTaskPage from '../features/admin/pages/AdminAssignTaskPage'
import UserProfilePage from '../features/users/pages/UserProfilePage'

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
        { path: '/why-us', element: <WhyUsPage /> },
        { path: '/pricing', element: <PricingPage /> },
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
        { path: 'tasks', element: <TaskListPage /> },
        { path: 'tasks/create', element: <CreateTaskPage /> },
        { path: 'tasks/:id', element: <TaskDetailPage /> },
        { path: 'tasks/:id/edit', element: <EditTaskPage /> },
        { path: 'inbox', element: <Placeholder title="Inbox" /> },
        { path: 'today', element: <Placeholder title="Today" /> },
        { path: 'starred', element: <Placeholder title="Starred" /> },
        { path: 'profile', element: <UserProfilePage /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboardPage /> },
        { path: 'users', element: <AdminUsersPage /> },
        { path: 'tasks', element: <AdminTasksPage /> },
        { path: 'tasks/assign', element: <AdminAssignTaskPage /> },
        { path: 'deleted', element: <AdminDeletedTasksPage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ])
}
