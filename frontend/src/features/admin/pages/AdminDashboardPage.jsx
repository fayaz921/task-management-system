import { motion } from 'framer-motion'
import { Users, Activity, Shield, AlertTriangle, UserPlus, Trash2, UserCog, FileText, Settings } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const metrics = [
  { label: 'Total users', value: '52,184', icon: Users, color: 'var(--primary)' },
  { label: 'Active today', value: '12,903', icon: Activity, color: '#34d399' },
  { label: 'Uptime', value: '99.99%', icon: Shield, color: 'var(--accent)' },
  { label: 'Open reports', value: '4', icon: AlertTriangle, color: 'var(--destructive)' },
]

const activityLog = [
  { icon: UserPlus, text: 'New user "Sara Ahmed" signed up', time: '2 minutes ago', color: '#34d399' },
  { icon: Trash2, text: 'Admin deleted task "Old migration script"', time: '18 minutes ago', color: 'var(--destructive)' },
  { icon: UserCog, text: 'Role changed: "Omar K." promoted to Admin', time: '1 hour ago', color: 'var(--primary)' },
  { icon: FileText, text: 'Weekly audit log generated', time: '3 hours ago', color: 'var(--accent)' },
  { icon: Settings, text: 'System settings updated by Muhammad Fayaz', time: 'Yesterday', color: 'var(--muted-foreground)' },
]

export default function AdminDashboardPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.h1 variants={fadeUp} style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem' }}>
        Admin Dashboard
      </motion.h1>

      {/* Metric cards */}
      <motion.div variants={fadeUp} className="row g-3 mb-4">
        {metrics.map((m) => {
          const Icon = m.icon
          return (
            <div key={m.label} className="col-6 col-md-3">
              <div className="stat-card">
                <div
                  style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    background: `${m.color}15`,
                    display: 'grid', placeItems: 'center',
                    color: m.color,
                    marginBottom: '0.75rem',
                  }}
                >
                  <Icon size={20} />
                </div>
                <div className="stat-card-value">{m.value}</div>
                <div className="stat-card-label">{m.label}</div>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Recent activity */}
      <motion.div variants={fadeUp}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Recent activity</h2>
        <div className="tf-card p-3">
          {activityLog.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="activity-item">
                <div className="activity-icon" style={{ color: item.color }}>
                  <Icon size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', lineHeight: 1.5 }}>{item.text}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted-foreground)' }}>{item.time}</div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
