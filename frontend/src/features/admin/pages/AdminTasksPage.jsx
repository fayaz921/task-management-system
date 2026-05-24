import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, Trash2, Search } from 'lucide-react'
import ConfirmModal from '../../../shared/components/ConfirmModal'

const mockTasks = [
  { id: 1, title: 'Finalize Q3 product roadmap', assignee: 'Ada Lovelace', status: 'Pending', priority: 'High', dueDate: '2024-07-15' },
  { id: 2, title: 'Design review with brand team', assignee: 'Priya Patel', status: 'InProgress', priority: 'Medium', dueDate: '2024-07-10' },
  { id: 3, title: 'Ship onboarding email sequence', assignee: 'Marcus Chen', status: 'Pending', priority: 'High', dueDate: '2024-07-08' },
  { id: 4, title: '1:1 with Priya', assignee: 'Ada Lovelace', status: 'Completed', priority: 'Low', dueDate: '2024-07-05' },
  { id: 5, title: 'Update API documentation', assignee: 'Layla Hassan', status: 'InProgress', priority: 'Medium', dueDate: '2024-07-20' },
  { id: 6, title: 'Prepare quarterly presentation', assignee: 'Grace Hopper', status: 'Pending', priority: 'High', dueDate: '2024-07-25' },
]

const statusColors = { Pending: 'warning', InProgress: 'info', Completed: 'success' }
const priorityColors = { Low: 'secondary', Medium: 'warning', High: 'danger' }

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState(mockTasks)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModal, setDeleteModal] = useState(null)
  const tasksPerPage = 6

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = !statusFilter || task.status === statusFilter
      const matchesPriority = !priorityFilter || task.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, search, statusFilter, priorityFilter])

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage)

  const handleDelete = () => {
    setTasks(prev => prev.filter(t => t.id !== deleteModal))
    setDeleteModal(null)
  }

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
                  <th>Assigned To</th>
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
                    <td>{task.assignee}</td>
                    <td><span className={`badge bg-${statusColors[task.status]}`}>{task.status}</span></td>
                    <td><span className={`badge bg-${priorityColors[task.priority]}`}>{task.priority}</span></td>
                    <td>{new Date(task.dueDate).toLocaleDateString()}</td>
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