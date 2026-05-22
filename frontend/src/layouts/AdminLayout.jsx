import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ShellNavbar, Sidebar } from './UserLayout'

const adminItems = [
  { label: 'Admin Dashboard', icon: 'bi-house-door-fill', to: '/admin/dashboard' },
  { label: 'All Users', icon: 'bi-people-fill', to: '/admin/users' },
  { label: 'All Tasks', icon: 'bi-clipboard2-check-fill', to: '/admin/tasks' },
  { label: 'Deleted Tasks', icon: 'bi-trash3-fill', to: '/admin/tasks/deleted' },
  { label: 'Profile', icon: 'bi-person-fill', to: '/profile' },
]

export default function AdminLayout({ children }) {
  const location = useLocation()

  return (
    <div className="app-shell">
      <ShellNavbar />
      <Sidebar items={adminItems} role="Admin Panel" badgeClass="admin" />
      <main className="app-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {children || <Outlet />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
