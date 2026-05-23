import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  CalendarDays,
  ChevronLeft,
  Inbox,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  User,
  Users,
} from 'lucide-react'

const userNav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/app' },
  { label: 'My Tasks', icon: ListTodo, to: '/app/tasks' },
  { label: 'Inbox', icon: Inbox, to: '/app/inbox' },
  { label: 'Today', icon: CalendarDays, to: '/app/today' },
  { label: 'Starred', icon: Star, to: '/app/starred' },
]

const adminNav = [
  { label: 'Admin Dashboard', icon: LayoutDashboard, to: '/admin' },
  { label: 'All Users', icon: Users, to: '/admin/users' },
  { label: 'All Tasks', icon: ShieldCheck, to: '/admin/tasks' },
  { label: 'Deleted Tasks', icon: Trash2, to: '/admin/deleted' },
]

const dropdownMotion = {
  initial: { opacity: 0, y: -8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
  transition: { duration: 0.15, ease: 'easeOut' },
}

export default function DashboardShell({ variant = 'user' }) {
  const isAdmin = variant === 'admin'
  const location = useLocation()
  const navItems = isAdmin ? adminNav : userNav
  const user = isAdmin
    ? {
        name: 'Grace Hopper',
        initials: 'GH',
        email: 'grace@taskflow.app',
        search: 'Search users, tasks, logs…',
        notifications: [
          { text: '3 new user signups in the last hour', time: 'Just now' },
          { text: 'Storage at 78% of monthly quota', time: '20 minutes ago' },
          { text: 'Weekly audit log is ready', time: 'This morning' },
        ],
      }
    : {
        name: 'Ada Lovelace',
        initials: 'AL',
        email: 'ada@taskflow.app',
        search: 'Search your tasks…',
        notifications: [
          { text: "Priya commented on 'Q3 roadmap'", time: '2 minutes ago' },
          { text: "Task 'Design review' is due today", time: '1 hour ago' },
          { text: 'You earned a 12-day streak', time: 'This morning' },
        ],
      }

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setMobileDrawerOpen(false)
    setOpenDropdown(null)
  }, [location.pathname])

  useEffect(() => {
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', closeDropdown)
    return () => document.removeEventListener('mousedown', closeDropdown)
  }, [])

  const toggleDropdown = (name) => {
    setOpenDropdown((current) => (current === name ? null : name))
  }

  const toggleMobileDrawer = () => {
    if (window.matchMedia('(min-width: 992px)').matches) {
      return
    }

    setMobileDrawerOpen((open) => !open)
  }

  const sidebarWidth = sidebarOpen ? 248 : 76

  const sidebar = (isMobile = false) => (
    <>
      <nav>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to

          return (
            <Link
              key={item.to}
              to={item.to}
              className={isActive ? 'active' : ''}
              title={!sidebarOpen && !isMobile ? item.label : undefined}
            >
              <Icon size={20} />
              <AnimatePresence initial={false}>
                {(sidebarOpen || isMobile) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          )
        })}
      </nav>
      {!isMobile && (
        <button type="button" className="dash-collapse" onClick={() => setSidebarOpen((open) => !open)}>
          <motion.span animate={{ rotate: sidebarOpen ? 0 : 180 }} transition={{ duration: 0.2 }}>
            <ChevronLeft size={16} />
          </motion.span>
          <AnimatePresence initial={false}>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.18 }}
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      )}
    </>
  )

  return (
    <div className={`dash-shell ${sidebarOpen ? '' : 'sidebar-collapsed'}`} style={{ '--dash-sidebar-width': `${sidebarWidth}px` }}>
      <header className="dash-navbar" ref={dropdownRef}>
        <button
          className="dash-icon-button dash-mobile-menu-button"
          type="button"
          aria-label="Toggle sidebar"
          aria-expanded={mobileDrawerOpen}
          onClick={toggleMobileDrawer}
        >
          <Menu size={20} />
        </button>

        <Link to="/" className="dash-brand">
          <span>
            <Sparkles size={16} />
          </span>
          <strong>TaskFlow</strong>
          {isAdmin && (
            <em>
              <i />
              Admin
            </em>
          )}
        </Link>

        <div className="dash-search">
          <Search size={16} />
          <input placeholder={user.search} />
        </div>

        <div className="dash-actions">
          <div className="dash-dropdown-wrap">
            <button
              className="dash-icon-button"
              type="button"
              aria-label="Notifications"
              onClick={() => toggleDropdown('notifications')}
            >
              <Bell size={20} />
              <span>{user.notifications.length}</span>
            </button>
            <AnimatePresence>
              {openDropdown === 'notifications' && (
                <motion.div className="dash-dropdown dash-notification-dropdown" {...dropdownMotion}>
                  <div className="dash-dropdown-title">Notifications</div>
                  {user.notifications.map((notification) => (
                    <div key={`${notification.text}-${notification.time}`} className="dash-notification-item">
                      <p>{notification.text}</p>
                      <small>{notification.time}</small>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="dash-dropdown-wrap">
            <button className="dash-user-button" type="button" onClick={() => toggleDropdown('profile')}>
              <span>{user.initials}</span>
              <strong>{user.name}</strong>
            </button>
            <AnimatePresence>
              {openDropdown === 'profile' && (
                <motion.div className="dash-dropdown dash-profile-dropdown" {...dropdownMotion}>
                  <div className="dash-profile-head">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                  <Link to="/profile" className="dash-dropdown-action">
                    <User size={16} />
                    Profile
                  </Link>
                  <button className="dash-dropdown-action" type="button">
                    <Settings size={16} />
                    Settings
                  </button>
                  <Link to="/login" className="dash-dropdown-action danger">
                    <LogOut size={16} />
                    Sign out
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {isAdmin && <div className="dash-admin-line" />}

      <motion.aside className="dash-sidebar" animate={{ width: sidebarWidth }} transition={{ duration: 0.22, ease: 'easeOut' }}>
        {sidebar(false)}
      </motion.aside>

      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
            />
            <motion.aside
              className="dash-mobile-sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {sidebar(true)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="dash-main">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}
