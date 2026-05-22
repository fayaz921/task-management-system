import { Link, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const navItems = [
  { label: 'Dashboard', icon: 'bi-house-door-fill', to: '/dashboard' },
  { label: 'My Tasks', icon: 'bi-check2-square', to: '/tasks' },
  { label: 'Create Task', icon: 'bi-plus-circle-fill', to: '/tasks/create' },
  { label: 'Profile', icon: 'bi-person-fill', to: '/profile' },
]

const sidebarVariants = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0 },
}

function ShellNavbar() {
  return (
    <nav className="app-navbar navbar fixed-top px-3 px-lg-4">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-3 m-0" to="/dashboard">
          <motion.span className="brand-mark" whileHover={{ rotate: -8, scale: 1.06 }}>
            <i className="bi bi-lightning-charge-fill" />
          </motion.span>
          <span className="fs-4 fw-black gradient-text">TaskFlow</span>
        </Link>
        <div className="d-flex align-items-center gap-3">
          <motion.button className="nav-icon-button" type="button" whileHover={{ y: -2, scale: 1.04 }}>
            <i className="bi bi-bell-fill" />
          </motion.button>
          <div className="dropdown">
            <motion.button
              className="btn p-0 border-0 d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
              whileHover={{ y: -2 }}
            >
              <span className="avatar">RF</span>
            </motion.button>
            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li>
                <Link className="dropdown-item" to="/profile">Profile</Link>
              </li>
              <li>
                <button className="dropdown-item" type="button">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

function Sidebar({ items = navItems, role = 'User', badgeClass = '' }) {
  const { pathname } = useLocation()

  return (
    <motion.aside className="app-sidebar d-flex flex-column" variants={sidebarVariants} initial="hidden" animate="show">
      <div className="sidebar-heading mb-4">
        <span className={`role-badge ${badgeClass}`}>{role}</span>
      </div>
      <nav className="sidebar-nav">
        {items.map((item) => (
          <motion.div key={item.to} variants={itemVariants} whileHover={{ x: 4 }}>
            <Link className={`sidebar-link ${pathname === item.to ? 'active' : ''}`} to={item.to}>
              <i className={`bi ${item.icon}`} />
              <span className="sidebar-label">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>
      <motion.div className="sidebar-user-card d-flex align-items-center gap-3" variants={itemVariants}>
        <span className="avatar">R</span>
        <div className="sidebar-user-copy">
          <div className="fw-bold">Rizwan</div>
          <div className="small text-secondary-custom">{role}</div>
        </div>
      </motion.div>
    </motion.aside>
  )
}

export default function UserLayout({ children }) {
  const location = useLocation()

  return (
    <div className="app-shell">
      <ShellNavbar />
      <Sidebar />
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

export { ShellNavbar, Sidebar, navItems }
