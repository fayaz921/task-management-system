import { motion } from 'framer-motion'
import { CircleCheck, Clock, TrendingUp } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const stats = [
  { label: 'Tasks today', value: '8', icon: Clock, tone: 'primary' },
  { label: 'Completed this week', value: '24', icon: CircleCheck, tone: 'success' },
  { label: 'Productivity', value: '+18%', icon: TrendingUp, tone: 'accent' },
]

const tasks = [
  { title: 'Finalize Q3 product roadmap', time: 'Today · 3:00 PM', priority: 'High' },
  { title: 'Design review with brand team', time: 'Tomorrow · 10:30 AM', priority: 'Med' },
  { title: 'Ship onboarding email sequence', time: 'Fri · End of day', priority: 'High' },
  { title: '1:1 with Priya', time: 'Mon · 9:00 AM', priority: 'Low' },
]

export default function DashboardPage() {
  return (
    <motion.div className="dash-page" variants={stagger} initial="hidden" animate="show">
      <motion.header variants={fadeUp}>
        <p>Good afternoon, Ada</p>
        <h1>Here's your day</h1>
      </motion.header>

      <motion.section className="dash-stat-grid user" variants={stagger}>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <motion.article key={stat.label} className="dash-stat-card" variants={fadeUp}>
              <div>
                <p>{stat.label}</p>
                <Icon className={stat.tone} size={20} />
              </div>
              <strong>{stat.value}</strong>
            </motion.article>
          )
        })}
      </motion.section>

      <motion.section className="dash-panel" variants={fadeUp}>
        <div className="dash-panel-header">
          <h2>Upcoming tasks</h2>
          <span>{tasks.length} items</span>
        </div>
        <ul className="dash-task-list">
          {tasks.map((task) => (
            <li key={task.title}>
              <div className="dash-task-left">
                <span className="dash-task-check" />
                <div>
                  <p>{task.title}</p>
                  <small>{task.time}</small>
                </div>
              </div>
              <span className="dash-priority">{task.priority}</span>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  )
}
