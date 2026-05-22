import { useState, useRef, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Search, Bell, Menu, ChevronLeft,
  LayoutDashboard, ListTodo, Inbox, CalendarDays, Star,
  Users, ShieldCheck, Trash2, User, Settings, LogOut,
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

const userData = {
  name: 'Ada Lovelace',
  email: 'ada@taskflow.app',
  initials: 'AL',
  notifications: [
    { text: "Priya commented on 'Q3 roadmap'", time: '2 minutes ago' },
    { text: "Task 'Design review' is due today", time: '1 hour ago' },
    { text: 'You earned a 12-day streak 🎉', time: 'This morning' },
  ],
}

const adminData = {
  name: 'Muhammad Fayaz',
  email: 'mfayaz21703@gmail.com',
  initials: 'MF',
  notifications: [
    { text: '3 new user signups in the last hour', time: 'Just now' },
    { text: 'Storage at 78% of monthly quota', time: '20 minutes ago' },
    { text: 'Weekly audit log is ready', time: 'This morning' },
  ],
}

const dropdownMotion = {
  initial: { opacity: 0, y: -8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
  transition: { duration: 0.15 },
}

export default function DashboardShell({ variant = 'user' }) {
  const isAdmin = variant === 'admin'
  const navItems = isAdmin ? adminNav : userNav
  const mockData = isAdmin ? adminData : userData
  const searchPlaceholder = isAdmin ? 'Search users, tasks, logs…' : 'Search your tasks…'

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileDrawer, setMobileDrawer] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const location = useLocation()
  const dropdownRef = useRef(null)

  const sidebarWidth = sidebarOpen ? 248 : 76

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => { setMobileDrawer(false) }, [location.pathname])

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }

  const SidebarContent = ({ isMobile = false }) => (
    <>
      <nav className="d-flex flex-column gap-1 flex-grow-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
              onClick={() => isMobile && setMobileDrawer(false)}
            >
              <Icon size={20} />
              <AnimatePresence>
                {(sidebarOpen || isMobile) && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
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
        <button
          className="sidebar-collapse-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }} transition={{ duration: 0.25 }}>
            <ChevronLeft size={16} />
          </motion.div>
        </button>
      )}
    </>
  )

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh' }}>
      {/* ── Navbar ── */}
      <header className="dash-navbar" ref={dropdownRef}>
        {/* Hamburger (mobile) */}
        <button
          className="nav-icon-btn d-lg-none"
          onClick={() => setMobileDrawer(!mobileDrawer)}
        >
          <Menu size={18} />
        </button>

        {/* Logo */}
        <Link to={isAdmin ? '/admin' : '/app'} className="d-flex align-items-center gap-2 text-decoration-none">
          <div className="brand-mark">
            <Sparkles size={16} />
          </div>
          <span className="fw-black" style={{ fontSize: '1.05rem', color: 'var(--foreground)' }}>TaskFlow</span>
          {isAdmin && (
            <span className="admin-pill ms-1">
              <span className="admin-pill-dot" />
              Admin
            </span>
          )}
        </Link>

        {/* Search */}
        <div className="search-input mx-auto">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder={searchPlaceholder} />
        </div>

        {/* Right actions */}
        <div className="d-flex align-items-center gap-2 ms-auto position-relative">
          {/* Bell */}
          <div className="position-relative">
            <motion.button
              className="nav-icon-btn"
              whileHover={{ y: -1 }}
              onClick={() => toggleDropdown('notifications')}
            >
              <Bell size={18} />
              <span className="nav-badge">{mockData.notifications.length}</span>
            </motion.button>

            <AnimatePresence>
              {openDropdown === 'notifications' && (
                <motion.div className="tf-dropdown notification-dropdown" {...dropdownMotion}>
                  <div className="px-3 py-2" style={{ fontWeight: 700, fontSize: '0.85rem', borderBottom: '1px solid var(--border)' }}>
                    Notifications
                  </div>
                  {mockData.notifications.map((n, i) => (
                    <div key={i} className="notification-item">
                      <div>
                        <div style={{ lineHeight: 1.5 }}>{n.text}</div>
                        <div className="notification-time">{n.time}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Avatar */}
          <div className="position-relative">
            <motion.div
              className="avatar-circle"
              whileHover={{ y: -1 }}
              onClick={() => toggleDropdown('profile')}
            >
              {mockData.initials}
            </motion.div>

            <AnimatePresence>
              {openDropdown === 'profile' && (
                <motion.div className="tf-dropdown" {...dropdownMotion}>
                  <div className="px-3 py-2">
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{mockData.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{mockData.email}</div>
                  </div>
                  <div className="tf-dropdown-divider" />
                  <button className="tf-dropdown-item"><User size={16} /> Profile</button>
                  <button className="tf-dropdown-item"><Settings size={16} /> Settings</button>
                  <div className="tf-dropdown-divider" />
                  <Link to="/login" className="tf-dropdown-item destructive"><LogOut size={16} /> Sign out</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Admin gradient line */}
      {isAdmin && <div className="admin-gradient-line" />}

      {/* ── Sidebar (desktop) ── */}
      <motion.aside
        className="dash-sidebar d-none d-lg-flex"
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <SidebarContent />
      </motion.aside>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileDrawer && (
          <>
            <motion.div
              className="drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawer(false)}
            />
            <motion.aside
              className="dash-sidebar d-flex d-lg-none"
              style={{ width: 260 }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <SidebarContent isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <motion.main
        className="dash-main"
        animate={{ paddingLeft: window.innerWidth >= 992 ? sidebarWidth + 24 : undefined }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  )
}
