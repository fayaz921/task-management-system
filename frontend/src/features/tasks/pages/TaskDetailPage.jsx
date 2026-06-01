import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Edit, Trash2, CalendarDays, Clock } from 'lucide-react'
import ConfirmModal from '../../../shared/components/ConfirmModal'
import Spinner from '../../../shared/components/Spinner'
import useGetTaskById from '../hooks/useGetTaskById'
import useDeleteTask from '../hooks/useDeleteTask'

const statusLabels = { 0: 'Pending', 1: 'InProgress', 2: 'Completed' }
const priorityLabels = { 0: 'Low', 1: 'Medium', 2: 'High' }
const statusColors = { 0: 'warning', 1: 'info', 2: 'success' }
const priorityColors = { 0: 'secondary', 1: 'warning', 2: 'danger' }

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

export default function TaskDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { task, loading, error } = useGetTaskById(id)
  const { deleteTask } = useDeleteTask()
  const [deleteModal, setDeleteModal] = useState(false)

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>
  if (error) return <div className="alert alert-danger">{error}</div>

  const handleDelete = async () => {
    try {
      await deleteTask(id)
      navigate('/app/tasks')
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <motion.div className="dash-page" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
      <motion.header variants={fadeUp}>
        <Link to="/app/tasks" className="btn btn-ghost btn-sm mb-3 d-inline-flex align-items-center gap-2">
          <ArrowLeft size={16} /> Back to Tasks
        </Link>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h1>{task?.title}</h1>
            <div className="d-flex gap-2 mt-2">
              <span className={`badge bg-${statusColors[task?.status]}`}>{statusLabels[task?.status]}</span>
              <span className={`badge bg-${priorityColors[task?.priority]}`}>{priorityLabels[task?.priority]}</span>
            </div>
          </div>
          <div className="d-flex gap-2">
            <Link to={`/app/tasks/${id}/edit`} className="btn btn-outline-primary d-flex align-items-center gap-2">
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
        <p className="text-muted">{task?.description}</p>

        <div className="d-flex flex-wrap gap-4 mt-4">
          <div className="d-flex align-items-center gap-2">
            <CalendarDays size={18} className="text-primary" />
            <div>
              <small className="text-muted d-block">Due Date</small>
              <strong>{task?.dueDate && new Date(task.dueDate).toLocaleDateString()}</strong>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Clock size={18} className="text-primary" />
            <div>
              <small className="text-muted d-block">Created At</small>
              <strong>{task?.createdAt && new Date(task.createdAt).toLocaleDateString()}</strong>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Clock size={18} className="text-primary" />
            <div>
              <small className="text-muted d-block">Updated At</small>
              <strong>{task?.updatedAt && new Date(task.updatedAt).toLocaleDateString()}</strong>
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
