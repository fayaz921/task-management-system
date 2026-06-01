import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, Eye, Star } from 'lucide-react'
import api from '../../../lib/axios'
import Spinner from '../../../shared/components/Spinner'

const statusLabels = { 0: 'Pending', 1: 'InProgress', 2: 'Completed' }
const priorityLabels = { 0: 'Low', 1: 'Medium', 2: 'High' }
const statusColors = { 0: 'warning', 1: 'info', 2: 'success' }
const priorityColors = { 0: 'secondary', 1: 'warning', 2: 'danger' }

const pageConfig = {
  inbox: {
    title: 'Inbox',
    subtitle: 'Tasks waiting for your attention',
    icon: CalendarDays,
    filter: (task) => task.status === 0,
  },
  today: {
    title: 'Today',
    subtitle: 'Tasks due today',
    icon: CalendarDays,
    filter: (task) => {
      if (!task.dueDate) return false
      const due = new Date(task.dueDate)
      const now = new Date()
      return due.getFullYear() === now.getFullYear() && due.getMonth() === now.getMonth() && due.getDate() === now.getDate()
    },
  },
  starred: {
    title: 'Starred',
    subtitle: 'High priority tasks',
    icon: Star,
    filter: (task) => task.priority === 2,
  },
}

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

export default function TaskSmartListPage() {
  const { listType } = useParams()
  const config = pageConfig[listType] || pageConfig.inbox
  const Icon = config.icon
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    const fetchTasks = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await api.get('/Tasks', { params: { page: 1, pageSize: 200 } })
        if (!ignore && response.data.isSuccess) {
          setTasks(response.data.data?.items || [])
        } else if (!ignore) {
          setError(response.data.message || 'Failed to load tasks')
        }
      } catch (err) {
        if (!ignore) setError(err.response?.data?.message || err.message || 'Failed to load tasks')
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchTasks()

    return () => {
      ignore = true
    }
  }, [listType])

  const filteredTasks = useMemo(() => tasks.filter(config.filter), [tasks, config])

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <motion.div className="dash-page" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
      <motion.header variants={fadeUp}>
        <h1>{config.title}</h1>
        <p className="text-muted">{config.subtitle}</p>
      </motion.header>

      <motion.section className="dash-panel" variants={fadeUp}>
        {filteredTasks.length === 0 ? (
          <div className="text-center py-5">
            <Icon size={48} className="text-muted mb-3" />
            <h4>No tasks here</h4>
            <p className="text-muted">This list will fill automatically when tasks match it.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td><span className={`badge bg-${statusColors[task.status]}`}>{statusLabels[task.status]}</span></td>
                    <td><span className={`badge bg-${priorityColors[task.priority]}`}>{priorityLabels[task.priority]}</span></td>
                    <td>{task.dueDate && new Date(task.dueDate).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/app/tasks/${task.id}`} className="btn btn-sm btn-outline-secondary">
                        <Eye size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>
    </motion.div>
  )
}
