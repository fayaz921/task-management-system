import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, Trash2, Search } from 'lucide-react'
import ConfirmModal from '../../../shared/components/ConfirmModal'
import Spinner from '../../../shared/components/Spinner'
import useGetAllTasks from '../hooks/useGetAllTasks'
import useDeleteTask from '../../tasks/hooks/useDeleteTask'

const statusLabels = { 0: 'Pending', 1: 'InProgress', 2: 'Completed' }
const priorityLabels = { 0: 'Low', 1: 'Medium', 2: 'High' }
const statusColors = { 0: 'warning', 1: 'info', 2: 'success' }
const priorityColors = { 0: 'secondary', 1: 'warning', 2: 'danger' }

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

export default function AdminTasksPage() {
  const { tasks, loading, error, refetch } = useGetAllTasks()
  const { deleteTask } = useDeleteTask()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModal, setDeleteModal] = useState(null)
  const tasksPerPage = 6

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title?.toLowerCase().includes(search.toLowerCase()) || false
      const matchesStatus = !statusFilter || statusLabels[task.status] === statusFilter
      const matchesPriority = !priorityFilter || priorityLabels[task.priority] === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, search, statusFilter, priorityFilter])

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / tasksPerPage))
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage)

  const handleDelete = async () => {
    try {
      await deleteTask(deleteModal)
      refetch()
    } catch (err) {
      console.error('Delete failed:', err)
    }
    setDeleteModal(null)
  }

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <motion.div className="dash-page" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
      <motion.header variants={fadeUp}>
        <h1>All Tasks</h1>
        <p className="text-muted">View and manage all tasks across the platform</p>
      </motion.header>

      <motion.section className="dash-panel" variants={fadeUp}>
        <div className="d-flex flex-wrap gap-3 mb-4">
          <div className="search-input">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="tf-input" style={{ width: '180px' }} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
          </select>
          <select className="tf-input" style={{ width: '180px' }} value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {paginatedTasks.length === 0 ? (
          <div className="text-center py-5">
            <h5>No tasks found</h5>
            <p className="text-muted">Try adjusting your filters</p>
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
                {paginatedTasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td><span className={`badge bg-${statusColors[task.status]}`}>{statusLabels[task.status]}</span></td>
                    <td><span className={`badge bg-${priorityColors[task.priority]}`}>{priorityLabels[task.priority]}</span></td>
                    <td>{task.dueDate && new Date(task.dueDate).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link to={`/admin/tasks/${task.id}`} className="btn btn-sm btn-outline-primary"><Eye size={14} /></Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => setDeleteModal(task.id)}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </motion.section>

      <ConfirmModal
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal(null)}
        isOpen={!!deleteModal}
      />
    </motion.div>
  )
}