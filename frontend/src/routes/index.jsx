import { Navigate, useRoutes } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import AuthLayout from '../layouts/AuthLayout'
import UserLayout from '../layouts/UserLayout'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

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
import TaskSmartListPage from '../features/tasks/pages/TaskSmartListPage'
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage'
import AdminUsersPage from '../features/admin/pages/AdminUsersPage'
import AdminTasksPage from '../features/admin/pages/AdminTasksPage'
import AdminDeletedTasksPage from '../features/admin/pages/AdminDeletedTasksPage'
import AdminAssignTaskPage from '../features/admin/pages/AdminAssignTaskPage'
import UserProfilePage from '../features/users/pages/UserProfilePage'
import { useAuthStore } from '../features/auth/store/authStore'
import { isAdminRole } from '../shared/utils/constants'

function PublicRoute() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  if (isLoggedIn) {
    const user = useAuthStore.getState().user
    return isAdminRole(user?.role) ? <Navigate to="/admin" replace /> : <Navigate to="/app" replace />
  }
  return <></>
}

export default function AppRoutes() {
  return useRoutes([
    {
      element: <PublicLayout />,
      children: [
        { path: '/', element: <><PublicRoute /><LandingPage /></> },
        { path: '/why-us', element: <><PublicRoute /><WhyUsPage /></> },
        { path: '/pricing', element: <><PublicRoute /><PricingPage /></> },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        { path: '/login', element: <><PublicRoute /><LoginPage /></> },
        { path: '/register', element: <><PublicRoute /><RegisterPage /></> },
        { path: '/forgot-password', element: <><PublicRoute /><ForgotPasswordPage /></> },
        { path: '/reset-password', element: <><PublicRoute /><ResetPasswordPage /></> },
      ],
    },
    {
      path: '/app',
      element: <ProtectedRoute />,
      children: [
        {
          element: <UserLayout />,
          children: [
            { index: true, element: <DashboardPage /> },
            { path: 'tasks', element: <TaskListPage /> },
            { path: 'tasks/create', element: <CreateTaskPage /> },
            { path: 'tasks/:id', element: <TaskDetailPage /> },
            { path: 'tasks/:id/edit', element: <EditTaskPage /> },
            { path: 'profile', element: <UserProfilePage /> },
            { path: ':listType', element: <TaskSmartListPage /> },
          ],
        },
      ],
    },
    {
      path: '/admin',
      element: <AdminRoute />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            { index: true, element: <AdminDashboardPage /> },
            { path: 'users', element: <AdminUsersPage /> },
            { path: 'tasks', element: <AdminTasksPage /> },
            { path: 'tasks/assign', element: <AdminAssignTaskPage /> },
            { path: 'deleted', element: <AdminDeletedTasksPage /> },
            { path: 'profile', element: <UserProfilePage /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ])
}
