import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, RotateCcw } from 'lucide-react'
import ConfirmModal from '../../../shared/components/ConfirmModal'
import Spinner from '../../../shared/components/Spinner'
import useGetDeletedTasks from '../hooks/useGetDeletedTasks'
import useRestoreTask from '../hooks/useRestoreTask'

const priorityLabels = { 0: 'Low', 1: 'Medium', 2: 'High' }
const priorityColors = { 0: 'secondary', 1: 'warning', 2: 'danger' }

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

export default function AdminDeletedTasksPage() {
  const { tasks, loading, error, refetch } = useGetDeletedTasks()
  const { restoreTask } = useRestoreTask()
  const [restoreModal, setRestoreModal] = useState(null)

  const handleRestore = async () => {
    try {
      await restoreTask(restoreModal)
      refetch()
    } catch (err) {
      console.error('Restore failed:', err)
    }
    setRestoreModal(null)
  }

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <motion.div className="dash-page" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
      <motion.header variants={fadeUp}>
        <h1>Deleted Tasks</h1>
        <p className="text-muted">Manage soft deleted tasks</p>
      </motion.header>

      <motion.section className="dash-panel" variants={fadeUp}>
        {tasks.length === 0 ? (
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
                  <th>Priority</th>
                  <th>Deleted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td><span className={`badge bg-${priorityColors[task.priority]}`}>{priorityLabels[task.priority]}</span></td>
                    <td>{task.deletedAt && new Date(task.deletedAt).toLocaleDateString()}</td>
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
