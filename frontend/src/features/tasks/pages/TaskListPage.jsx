import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, ChevronLeft, ChevronRight, Edit, Eye, Filter, Search, Trash2, Plus } from 'lucide-react'
import ConfirmModal from '../../../shared/components/ConfirmModal'
import Spinner from '../../../shared/components/Spinner'
import useGetTasks from '../hooks/useGetTasks'
import useDeleteTask from '../hooks/useDeleteTask'
import { useTaskStore } from '../store/taskStore'

const statusLabels = { 0: 'Pending', 1: 'InProgress', 2: 'Completed' }
const priorityLabels = { 0: 'Low', 1: 'Medium', 2: 'High' }
const statusColors = { 0: 'warning', 1: 'info', 2: 'success' }
const priorityColors = { 0: 'secondary', 1: 'warning', 2: 'danger' }

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function TaskListPage() {
  const { tasks, totalCount, page, pageSize, filters, setPage, setFilters } = useTaskStore()
  const { loading: deleteLoading, deleteTask } = useDeleteTask()
  const [deleteId, setDeleteId] = useState(null)
  const [localLoading, setLocalLoading] = useState(false)

  const { tasks: fetchedTasks, totalCount: fetchedTotal } = useGetTasks()
  const displayTasks = fetchedTasks.length > 0 ? fetchedTasks : []

  useEffect(() => {
    if (fetchedTasks.length > 0) {
      useTaskStore.setState({ tasks: fetchedTasks, totalCount: fetchedTotal })
    }
  }, [fetchedTasks, fetchedTotal])

  const filteredTasks = useMemo(() => {
    return displayTasks.filter(task => {
      const matchesSearch = task.title?.toLowerCase().includes(filters.search?.toLowerCase() || '')
      const matchesStatus = !filters.status || statusLabels[task.status] === filters.status
      const matchesPriority = !filters.priority || priorityLabels[task.priority] === filters.priority
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [displayTasks, filters])

  const tasksPerPage = 6
  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / tasksPerPage))
  const paginatedTasks = filteredTasks.slice((page - 1) * tasksPerPage, page * tasksPerPage)

  const handleDelete = async (id) => {
    setLocalLoading(true)
    try {
      await deleteTask(id)
      useTaskStore.setState({ tasks: useTaskStore.getState().tasks.filter(t => t.id !== id) })
      setDeleteId(null)
    } catch (err) {
      console.error('Delete failed:', err)
    } finally {
      setLocalLoading(false)
    }
  }

  if (!displayTasks.length && totalCount > 0) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>

  return (
    <motion.div className="dash-page" variants={stagger} initial="hidden" animate="show">
      <motion.header variants={fadeUp}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>Tasks</h1>
            <p className="text-muted">Manage your tasks and stay organized</p>
          </div>
          <Link to="/app/tasks/create" className="btn btn-primary btn-gradient d-flex align-items-center gap-2">
            <Plus size={16} /> Create Task
          </Link>
        </div>
      </motion.header>

      <motion.section className="dash-panel" variants={fadeUp}>
        <div className="d-flex flex-wrap gap-3 mb-4">
          <div className="search-input">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search tasks..." value={filters.search} onChange={e => setFilters({ search: e.target.value })} />
          </div>
          <select className="tf-input" style={{ width: '180px' }} value={filters.status} onChange={e => setFilters({ status: e.target.value })}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
          </select>
          <select className="tf-input" style={{ width: '180px' }} value={filters.priority} onChange={e => setFilters({ priority: e.target.value })}>
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {paginatedTasks.length === 0 ? (
          <motion.div className="text-center py-5" variants={fadeUp}>
            <CalendarDays size={48} className="text-muted mb-3" />
            <h4>No tasks found</h4>
            <p className="text-muted">Try adjusting your filters or create a new task</p>
          </motion.div>
        ) : (
          <motion.div className="row g-4" variants={stagger}>
            {paginatedTasks.map(task => (
              <motion.div key={task.id} className="col-12 col-md-6 col-lg-4" variants={fadeUp}>
                <div className="tf-card h-100 p-3 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="mb-0">{task.title}</h5>
                    <span className={`badge bg-${statusColors[task.status]}`}>{statusLabels[task.status]}</span>
                  </div>
                  <p className="text-muted small flex-grow-1">{task.description}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className={`badge bg-${priorityColors[task.priority]}`}>{priorityLabels[task.priority]}</span>
                    <small className="text-muted">{new Date(task.dueDate).toLocaleDateString()}</small>
                  </div>
                  <div className="d-flex gap-2 mt-3">
                    <Link to={`/app/tasks/${task.id}`} className="btn btn-sm btn-outline-secondary"><Eye size={14} /></Link>
                    <Link to={`/app/tasks/${task.id}/edit`} className="btn btn-sm btn-outline-primary"><Edit size={14} /></Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteId(task.id)}><Trash2 size={14} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(p => Math.max(1, p - 1))}><ChevronLeft size={16} /></button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setPage(p => Math.min(totalPages, p + 1))}><ChevronRight size={16} /></button>
              </li>
            </ul>
          </nav>
        )}
      </motion.section>

      <AnimatePresence>
        {deleteId && (
          <ConfirmModal
            title="Delete Task"
            message="Are you sure you want to delete this task? This action cannot be undone."
            onConfirm={() => handleDelete(deleteId)}
            onCancel={() => setDeleteId(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}