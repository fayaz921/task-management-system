import { motion } from 'framer-motion'
import { CheckCircle, ListTodo, Trash2, Users } from 'lucide-react'
import Spinner from '../../../shared/components/Spinner'
import useGetAdminDashboard from '../hooks/useGetAdminDashboard'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function AdminDashboardPage() {
  const { data, loading, error } = useGetAdminDashboard()

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>
  if (error) return <div className="alert alert-danger">{error}</div>

  const metrics = [
    { label: 'Total users', value: data?.totalUsers || 0, note: 'Registered accounts', icon: Users },
    { label: 'Active tasks', value: data?.activeTasks || 0, note: 'Not deleted', icon: ListTodo },
    { label: 'Completed tasks', value: data?.completedTasks || 0, note: 'Finished work', icon: CheckCircle },
    { label: 'Deleted tasks', value: data?.deletedTasks || 0, note: 'Available to restore', icon: Trash2 },
  ]
  const activity = data?.recentActivity || []

  return (
    <motion.div className="dash-page" variants={stagger} initial="hidden" animate="show">
      <motion.header className="admin-page-header" variants={fadeUp}>
        <p>
          <span />
          Administrator view
        </p>
        <h1>Platform overview</h1>
      </motion.header>

      <motion.section className="dash-stat-grid admin" variants={stagger}>
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <motion.article key={metric.label} className="dash-stat-card" variants={fadeUp}>
              <div>
                <p>{metric.label}</p>
                <Icon className="primary" size={20} />
              </div>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </motion.article>
          )
        })}
      </motion.section>

      <motion.section className="dash-panel" variants={fadeUp}>
        <div className="dash-panel-header">
          <h2>Recent activity</h2>
        </div>
        <ul className="dash-activity-list">
          {activity.length === 0 && (
            <li>
              <p>
                <strong>System</strong>
                <span>No recent activity yet</span>
              </p>
              <small>Now</small>
            </li>
          )}
          {activity.map((item) => (
            <li key={`${item.actor}-${item.text}-${item.time}`}>
              <p>
                <strong>{item.actor}</strong>
                <span>{item.text}</span>
              </p>
              <small>{item.time ? new Date(item.time).toLocaleString() : ''}</small>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  )
}
