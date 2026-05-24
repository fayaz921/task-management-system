import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit, Trash2, CalendarDays, Clock } from 'lucide-react'
import ConfirmModal from '../../../shared/components/ConfirmModal'

const mockTasks = {
  1: { id: 1, title: 'Finalize Q3 product roadmap', description: 'Complete the roadmap for Q3 product releases including all feature specifications and timeline. This involves working with stakeholders to define priority features and create a realistic delivery schedule.', status: 'Pending', priority: 'High', dueDate: '2024-07-15', createdAt: '2024-06-01T10:30:00Z', updatedAt: '2024-06-15T14:22:00Z' },
  2: { id: 2, title: 'Design review with the brand team', description: 'Review brand guidelines and update design assets for consistency across all platforms including web, mobile, and marketing materials.', status: 'InProgress', priority: 'Medium', dueDate: '2024-07-10', createdAt: '2024-06-05T09:15:00Z', updatedAt: '2024-06-14T11:45:00Z' },
  3: { id: 3, title: 'Ship onboarding email sequence', description: 'Create and deploy the new user onboarding email sequence with welcome and tutorial steps to improve user activation rates.', status: 'Pending', priority: 'High', dueDate: '2024-07-08', createdAt: '2024-06-02', updatedAt: '2024-06-12' },
  4: { id: 4, title: '1:1 with Priya', description: 'Weekly one-on-one meeting to discuss progress, blockers, and upcoming priorities for the sprint.', status: 'Completed', priority: 'Low', dueDate: '2024-07-05', createdAt: '2024-06-04', updatedAt: '2024-06-05' },
  5: { id: 5, title: 'Update documentation for API v2', description: 'Refresh the API documentation with new endpoints, examples, and error handling to support developer onboarding.', status: 'InProgress', priority: 'Medium', dueDate: '2024-07-20', createdAt: '2024-06-08', updatedAt: '2024-06-13' },
  6: { id: 6, title: 'Prepare quarterly team presentation', description: 'Create slides and talking points for the quarterly all-hands presentation covering team achievements and next quarter goals.', status: 'Pending', priority: 'High', dueDate: '2024-07-25', createdAt: '2024-06-10', updatedAt: '2024-06-14' },
}

const statusColors = { Pending: 'warning', InProgress: 'info', Completed: 'success' }
const priorityColors = { Low: 'secondary', Medium: 'warning', High: 'danger' }

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

export default function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const task = mockTasks[id] || mockTasks[1]
  const [deleteModal, setDeleteModal] = useState(false)

  const handleDelete = () => {
    setDeleteModal(false)
    setTimeout(() => navigate('/app/tasks'), 500)
  }

  return (
    <motion.div className="dash-page" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
      <motion.header variants={fadeUp}>
        <Link to="/app/tasks" className="btn btn-ghost btn-sm mb-3 d-inline-flex align-items-center gap-2">
          <ArrowLeft size={16} /> Back to Tasks
        </Link>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h1>{task.title}</h1>
            <div className="d-flex gap-2 mt-2">
              <span className={`badge bg-${statusColors[task.status]}`}>{task.status}</span>
              <span className={`badge bg-${priorityColors[task.priority]}`}>{task.priority}</span>
            </div>
          </div>
          <div className="d-flex gap-2">
            <Link to={`/app/tasks/${task.id}/edit`} className="btn btn-outline-primary d-flex align-items-center gap-2">
              <Edit size={16} /> Edit
            </Link>
            <button onClick={() => setDeleteModal(true)} className="btn btn-outline-danger d-flex align-items-center gap-2">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </motion.header>

      <motion.section className="dash-panel" variants={fadeUp}>
        <h5>Description</h5>
        <p className="text-muted">{task.description}</p>

        <div className="d-flex flex-wrap gap-4 mt-4">
          <div className="d-flex align-items-center gap-2">
            <CalendarDays size={18} className="text-primary" />
            <div>
              <small className="text-muted d-block">Due Date</small>
              <strong>{new Date(task.dueDate).toLocaleDateString()}</strong>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Clock size={18} className="text-primary" />
            <div>
              <small className="text-muted d-block">Created At</small>
              <strong>{new Date(task.createdAt).toLocaleDateString()}</strong>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Clock size={18} className="text-primary" />
            <div>
              <small className="text-muted d-block">Updated At</small>
              <strong>{new Date(task.updatedAt).toLocaleDateString()}</strong>
            </div>
          </div>
        </div>
      </motion.section>

      <ConfirmModal
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal(false)}
        isOpen={deleteModal}
      />
    </motion.div>
  )
}