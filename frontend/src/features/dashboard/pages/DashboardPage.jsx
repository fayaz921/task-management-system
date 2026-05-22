import { motion } from 'framer-motion'
import { CheckCircle2, TrendingUp, Zap } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const statCards = [
  { label: 'Tasks today', value: '8', icon: CheckCircle2, color: 'var(--primary)' },
  { label: 'Completion rate', value: '87%', icon: TrendingUp, color: '#34d399' },
  { label: 'Productivity', value: '+12%', icon: Zap, color: 'var(--accent)' },
]

const tasks = [
  { title: 'Review Q3 roadmap', due: 'Today', priority: '#ef4444' },
  { title: 'Design system audit', due: 'Tomorrow', priority: '#a78bfa' },
  { title: 'API documentation update', due: 'Jun 2', priority: '#38bdf8' },
  { title: 'Sprint planning meeting', due: 'Jun 3', priority: '#34d399' },
  { title: 'Deploy v2.4 hotfix', due: 'Today', priority: '#ef4444' },
]

export default function DashboardPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.h1 variants={fadeUp} style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem' }}>
        Good morning, Ada
      </motion.h1>

      {/* Stat cards */}
      <motion.div variants={fadeUp} className="row g-3 mb-4">
        {statCards.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="col-sm-4">
              <div className="stat-card d-flex align-items-center gap-3">
                <div
                  style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    background: `${s.color}15`,
                    display: 'grid', placeItems: 'center',
                    color: s.color,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div className="stat-card-value">{s.value}</div>
                  <div className="stat-card-label">{s.label}</div>
                </div>
              </div>
            </div>
          )
        })}
      </motion.div>

      {/* Upcoming tasks */}
      <motion.div variants={fadeUp}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Upcoming tasks</h2>
        <div className="tf-card p-2">
          {tasks.map((task) => (
            <div key={task.title} className="task-row">
              <div className="task-checkbox" />
              <div style={{ flex: 1, fontWeight: 500, fontSize: '0.9rem' }}>{task.title}</div>
              <span className="due-chip">{task.due}</span>
              <div className="priority-dot" style={{ background: task.priority }} />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
