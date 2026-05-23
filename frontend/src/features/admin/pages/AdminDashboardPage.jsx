import { motion } from 'framer-motion'
import { Activity, ListTodo, ShieldAlert, Users } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const metrics = [
  { label: 'Total users', value: '12,480', note: '+248 this week', icon: Users },
  { label: 'Active tasks', value: '94,712', note: '+3.2% MoM', icon: ListTodo },
  { label: 'Open reports', value: '7', note: '2 high priority', icon: ShieldAlert },
  { label: 'API uptime', value: '99.99%', note: 'Last 30 days', icon: Activity },
]

const activity = [
  { actor: 'Priya Patel', text: "deleted task 'Old marketing brief'", time: '2 min ago' },
  { actor: 'Marcus Chen', text: 'upgraded to Team plan', time: '18 min ago' },
  { actor: 'Layla Hassan', text: 'invited 4 new members', time: '1 hour ago' },
  { actor: 'System', text: 'ran scheduled cleanup of trashed tasks', time: '3 hours ago' },
]

export default function AdminDashboardPage() {
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
          {activity.map((item) => (
            <li key={`${item.actor}-${item.time}`}>
              <p>
                <strong>{item.actor}</strong>
                <span>{item.text}</span>
              </p>
              <small>{item.time}</small>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  )
}
