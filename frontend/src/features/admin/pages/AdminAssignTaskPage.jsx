import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus } from 'lucide-react'

const mockUsers = [
  { id: 1, name: 'Ada Lovelace' },
  { id: 2, name: 'Priya Patel' },
  { id: 3, name: 'Marcus Chen' },
  { id: 4, name: 'Layla Hassan' },
  { id: 5, name: 'Grace Hopper' },
]

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function AdminAssignTaskPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

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
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => navigate('/admin/tasks'), 1500)
    }, 800)
  }

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
        {success ? (
          <div className="text-center py-4">
            <h4 className="text-success mb-3">Task assigned successfully!</h4>
            <p className="text-muted">Redirecting to task list...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="d-grid gap-3">
            <div>
              <label className="tf-label">Select User *</label>
              <select
                className={`tf-input ${errors.userId ? 'is-invalid' : ''}`}
                value={formData.userId}
                onChange={e => setFormData({ ...formData, userId: e.target.value })}
              >
                <option value="">Choose a user...</option>
                {mockUsers.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
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
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="InProgress">InProgress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="tf-label">Priority</label>
              <select
                className="tf-input"
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
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
                {loading ? <span className="spinner-border spinner-border-sm" /> : <Plus size={16} />}
                Assign Task
              </button>
            </div>
          </form>
        )}
      </motion.section>
    </motion.div>
  )
}