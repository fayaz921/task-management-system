import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Trash2, RotateCcw } from 'lucide-react'
import ConfirmModal from '../../../shared/components/ConfirmModal'

const mockDeletedTasks = [
  { id: 7, title: 'Old marketing brief', assignee: 'Marcus Chen', status: 'Completed', priority: 'Medium', deletedAt: '2024-06-10' },
  { id: 8, title: 'Q2 planning doc', assignee: 'Priya Patel', status: 'Pending', priority: 'Low', deletedAt: '2024-06-08' },
  { id: 9, title: 'Legacy API migration', assignee: 'Grace Hopper', status: 'InProgress', priority: 'High', deletedAt: '2024-06-05' },
]

const statusColors = { Pending: 'warning', InProgress: 'info', Completed: 'success' }
const priorityColors = { Low: 'secondary', Medium: 'warning', High: 'danger' }

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

export default function AdminDeletedTasksPage() {
  const [deletedTasks, setDeletedTasks] = useState(mockDeletedTasks)
  const [restoreModal, setRestoreModal] = useState(null)

  const handleRestore = () => {
    setDeletedTasks(prev => prev.filter(t => t.id !== restoreModal))
    setRestoreModal(null)
  }

  return (
    <motion.div className="dash-page" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
      <motion.header variants={fadeUp}>
        <h1>Deleted Tasks</h1>
        <p className="text-muted">Manage soft deleted tasks</p>
      </motion.header>

      <motion.section className="dash-panel" variants={fadeUp}>
        {deletedTasks.length === 0 ? (
          <motion.div className="text-center py-5" variants={fadeUp}>
            <Trash2 size={48} className="text-muted mb-3" />
            <h4>No deleted tasks</h4>
            <p className="text-muted">All tasks are active</p>
          </motion.div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Deleted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deletedTasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.assignee}</td>
                    <td><span className={`badge bg-${statusColors[task.status]}`}>{task.status}</span></td>
                    <td><span className={`badge bg-${priorityColors[task.priority]}`}>{task.priority}</span></td>
                    <td>{new Date(task.deletedAt).toLocaleDateString()}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-success d-flex align-items-center gap-1"
                        onClick={() => setRestoreModal(task.id)}
                      >
                        <RotateCcw size={14} /> Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>

      <ConfirmModal
        title="Restore Task"
        message="Are you sure you want to restore this task?"
        onConfirm={handleRestore}
        onCancel={() => setRestoreModal(null)}
        isOpen={!!restoreModal}
      />
    </motion.div>
  )
}