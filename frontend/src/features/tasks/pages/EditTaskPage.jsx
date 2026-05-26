import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Save } from 'lucide-react'
import useGetTaskById from '../hooks/useGetTaskById'
import useUpdateTask from '../hooks/useUpdateTask'
import Spinner from '../../../shared/components/Spinner'

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function EditTaskPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { task, loading: fetchLoading, error } = useGetTaskById(id)
  const { updateTask, loading, error: updateError } = useUpdateTask()
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 0,
    priority: 1,
    dueDate: ''
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status !== undefined ? task.status : 0,
        priority: task.priority !== undefined ? task.priority : 1,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
      })
    }
  }, [task])

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required'
    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    updateTask(id, formData)
  }

  if (fetchLoading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <motion.div className="dash-page" variants={stagger} initial="hidden" animate="show">
      <motion.header variants={fadeUp}>
        <Link to={`/app/tasks/${id}`} className="btn btn-ghost btn-sm mb-3 d-inline-flex align-items-center gap-2">
          <ArrowLeft size={16} /> Back to Task
        </Link>
        <h1>Edit Task</h1>
        <p className="text-muted">Update task details</p>
      </motion.header>

      <motion.section className="dash-panel" style={{ maxWidth: '600px' }} variants={fadeUp}>
        {updateError && <div className="alert alert-danger mb-3">{updateError}</div>}
        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <div>
            <label className="tf-label">Title *</label>
            <input
              type="text"
              className={`tf-input ${formErrors.title ? 'is-invalid' : ''}`}
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter task title"
            />
            {formErrors.title && <div className="text-danger small mt-1">{formErrors.title}</div>}
          </div>

          <div>
            <label className="tf-label">Description *</label>
            <textarea
              className={`tf-input ${formErrors.description ? 'is-invalid' : ''}`}
              rows="4"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter task description"
            />
            {formErrors.description && <div className="text-danger small mt-1">{formErrors.description}</div>}
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
              className={`tf-input ${formErrors.dueDate ? 'is-invalid' : ''}`}
              value={formData.dueDate}
              onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
            />
            {formErrors.dueDate && <div className="text-danger small mt-1">{formErrors.dueDate}</div>}
          </div>

          <div className="d-flex gap-2 pt-2">
            <Link to={`/app/tasks/${id}`} className="btn btn-ghost">Cancel</Link>
            <button type="submit" className="btn btn-primary btn-gradient d-flex align-items-center gap-2" disabled={loading}>
              {loading ? <Spinner size={16} /> : <Save size={16} />}
              Update Task
            </button>
          </div>
        </form>
      </motion.section>
    </motion.div>
  )
}