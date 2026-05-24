import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Save } from 'lucide-react'

const mockTasks = {
  1: { id: 1, title: 'Finalize Q3 product roadmap', description: 'Complete the roadmap for Q3 product releases including all feature specifications and timeline.', status: 'Pending', priority: 'High', dueDate: '2024-07-15' },
  2: { id: 2, title: 'Design review with the brand team', description: 'Review brand guidelines and update design assets for consistency across all platforms.', status: 'InProgress', priority: 'Medium', dueDate: '2024-07-10' },
  3: { id: 3, title: 'Ship onboarding email sequence', description: 'Create and deploy the new user onboarding email sequence with welcome and tutorial steps.', status: 'Pending', priority: 'High', dueDate: '2024-07-08' },
  4: { id: 4, title: '1:1 with Priya', description: 'Weekly one-on-one meeting to discuss progress, blockers, and upcoming priorities.', status: 'Completed', priority: 'Low', dueDate: '2024-07-05' },
  5: { id: 5, title: 'Update documentation for API v2', description: 'Refresh the API documentation with new endpoints, examples, and error handling.', status: 'InProgress', priority: 'Medium', dueDate: '2024-07-20' },
  6: { id: 6, title: 'Prepare quarterly team presentation', description: 'Create slides and talking points for the quarterly all-hands presentation.', status: 'Pending', priority: 'High', dueDate: '2024-07-25' },
}

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function EditTaskPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const task = mockTasks[id] || mockTasks[1]
  
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const newErrors = {}
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
      setTimeout(() => navigate(`/app/tasks/${id}`), 1500)
    }, 800)
  }

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
        {success ? (
          <div className="text-center py-4">
            <h4 className="text-success mb-3">Task updated successfully!</h4>
            <p className="text-muted">Redirecting to task details...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="d-grid gap-3">
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
              <Link to={`/app/tasks/${id}`} className="btn btn-ghost">Cancel</Link>
              <button type="submit" className="btn btn-primary btn-gradient d-flex align-items-center gap-2" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm" /> : <Save size={16} />}
                Update Task
              </button>
            </div>
          </form>
        )}
      </motion.section>
    </motion.div>
  )
}