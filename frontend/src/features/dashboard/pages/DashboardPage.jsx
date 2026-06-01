import { motion } from 'framer-motion'
import { CircleCheck, Clock } from 'lucide-react'
import { useAuthStore } from '../../auth/store/authStore'
import useGetDashboard from '../hooks/useGetDashboard'
import Spinner from '../../../shared/components/Spinner'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export default function DashboardPage() {
  const { data, loading, error } = useGetDashboard()
  const user = useAuthStore((state) => state.user)

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>
  if (error) return <div className="alert alert-danger">{error}</div>

  const stats = [
    { label: 'Total Tasks', value: data?.totalTasks || 0, icon: CircleCheck, tone: 'primary' },
    { label: 'Pending Tasks', value: data?.pendingTasks || 0, icon: Clock, tone: 'warning' },
    { label: 'Completed Tasks', value: data?.completedTasks || 0, icon: CircleCheck, tone: 'success' },
  ]

  return (
    <motion.div className="dash-page" variants={stagger} initial="hidden" animate="show">
      <motion.header variants={fadeUp}>
        <p>Good afternoon, {user?.fullName || 'User'}</p>
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
    </motion.div>
  )
}
