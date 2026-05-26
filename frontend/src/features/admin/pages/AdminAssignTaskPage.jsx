import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus } from 'lucide-react'
import Spinner from '../../../shared/components/Spinner'
import useAssignTask from '../hooks/useAssignTask'
import useGetAllUsers from '../hooks/useGetAllUsers'

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function AdminAssignTaskPage() {
  const navigate = useNavigate()
  const { assignTask, loading, error } = useAssignTask()
  const { users, loading: usersLoading } = useGetAllUsers()
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    description: '',
    status: 0,
    priority: 1,
    dueDate: ''
  })
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.userId) newErrors.userId = 'User is required'
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    assignTask(formData)
  }

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>

  return (
    <motion.div className="dash-page" variants={stagger} initial="hidden" animate="show">
      <motion.header variants={fadeUp}>
        <Link to="/admin/tasks" className="btn btn-ghost btn-sm mb-3 d-inline-flex align-items-center gap-2">
          <ArrowLeft size={16} /> Back to Tasks
        </Link>
        <h1>Assign Task</h1>
        <p className="text-muted">Create and assign a new task to a user</p>
      </motion.header>

      <motion.section className="dash-panel" style={{ maxWidth: '600px' }} variants={fadeUp}>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <div>
            <label className="tf-label">Select User *</label>
            <select
              className={`tf-input ${errors.userId ? 'is-invalid' : ''}`}
              value={formData.userId}
              onChange={e => setFormData({ ...formData, userId: e.target.value })}
              disabled={usersLoading}
            >
              <option value="">Choose a user...</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>{u.fullName}</option>
              ))}
            </select>
            {errors.userId && <div className="text-danger small mt-1">{errors.userId}</div>}
          </div>

          <div>
            <label className="tf-label">Title *</label>
            <input
              type="text"
              className={`tf-input ${errors.title ? 'is-invalid' : ''}`}
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
            />
            {errors.title && <div className="text-danger small mt-1">{errors.title}</div>}
          </div>

          <div>
            <label className="tf-label">Description *</label>
            <textarea
              className={`tf-input ${errors.description ? 'is-invalid' : ''}`}
              rows="4"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter task description"
            />
            {errors.description && <div className="text-danger small mt-1">{errors.description}</div>}
          </div>

          <div>
            <label className="tf-label">Status</label>
            <select
              className="tf-input"
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: Number(e.target.value) })}
            >
              <option value={0}>Pending</option>
              <option value={1}>InProgress</option>
              <option value={2}>Completed</option>
            </select>
          </div>

          <div>
            <label className="tf-label">Priority</label>
            <select
              className="tf-input"
              value={formData.priority}
              onChange={e => setFormData({ ...formData, priority: Number(e.target.value) })}
            >
              <option value={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </select>
          </div>

          <div>
            <label className="tf-label">Due Date *</label>
            <input
              type="date"
              className={`tf-input ${errors.dueDate ? 'is-invalid' : ''}`}
              value={formData.dueDate}
              onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
            />
            {errors.dueDate && <div className="text-danger small mt-1">{errors.dueDate}</div>}
          </div>

          <div className="d-flex gap-2 pt-2">
            <Link to="/admin/tasks" className="btn btn-ghost">Cancel</Link>
            <button type="submit" className="btn btn-primary btn-gradient d-flex align-items-center gap-2" disabled={loading}>
              {loading ? <Spinner size={16} /> : <Plus size={16} />}
              Assign Task
            </button>
          </div>
        </form>
      </motion.section>
    </motion.div>
  )
}