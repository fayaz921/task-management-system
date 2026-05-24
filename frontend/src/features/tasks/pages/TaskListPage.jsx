import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, ChevronLeft, ChevronRight, Edit, Eye, Filter, Search, Trash2, Plus } from 'lucide-react'
import ConfirmModal from '../../../shared/components/ConfirmModal'
import Spinner from '../../../shared/components/Spinner'

const mockTasks = [
  { id: 1, title: 'Finalize Q3 product roadmap', description: 'Complete the roadmap for Q3 product releases including all feature specifications and timeline.', status: 'Pending', priority: 'High', dueDate: '2024-07-15', createdAt: '2024-06-01', updatedAt: '2024-06-15' },
  { id: 2, title: 'Design review with the brand team', description: 'Review brand guidelines and update design assets for consistency across all platforms.', status: 'InProgress', priority: 'Medium', dueDate: '2024-07-10', createdAt: '2024-06-05', updatedAt: '2024-06-14' },
  { id: 3, title: 'Ship onboarding email sequence', description: 'Create and deploy the new user onboarding email sequence with welcome and tutorial steps.', status: 'Pending', priority: 'High', dueDate: '2024-07-08', createdAt: '2024-06-02', updatedAt: '2024-06-12' },
  { id: 4, title: '1:1 with Priya', description: 'Weekly one-on-one meeting to discuss progress, blockers, and upcoming priorities.', status: 'Completed', priority: 'Low', dueDate: '2024-07-05', createdAt: '2024-06-04', updatedAt: '2024-06-05' },
  { id: 5, title: 'Update documentation for API v2', description: 'Refresh the API documentation with new endpoints, examples, and error handling.', status: 'InProgress', priority: 'Medium', dueDate: '2024-07-20', createdAt: '2024-06-08', updatedAt: '2024-06-13' },
  { id: 6, title: 'Prepare quarterly team presentation', description: 'Create slides and talking points for the quarterly all-hands presentation.', status: 'Pending', priority: 'High', dueDate: '2024-07-25', createdAt: '2024-06-10', updatedAt: '2024-06-14' },
]

const statusColors = { Pending: 'warning', InProgress: 'info', Completed: 'success' }
const priorityColors = { Low: 'secondary', Medium: 'warning', High: 'danger' }

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function TaskListPage() {
  const [tasks, setTasks] = useState(mockTasks)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteId, setDeleteId] = useState(null)
  const [loading, setLoading] = useState(false)
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

  const handleDelete = (id) => {
    setLoading(true)
    setTimeout(() => {
      setTasks(prev => prev.filter(t => t.id !== id))
      setDeleteId(null)
      setLoading(false)
    }, 500)
  }

  if (loading && tasks.length === 0) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>

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
            <input type="text" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="tf-input" style={{ width: '180px' }} value={statusFilter} onChange={e => setStatusFilter(e.target)}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="InProgress">InProgress</option>
            <option value="Completed">Completed</option>
          </select>
          <select className="tf-input" style={{ width: '180px' }} value={priorityFilter} onChange={e => setPriorityFilter(e.target)}>
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
                    <span className={`badge bg-${statusColors[task.status]}`}>{task.status}</span>
                  </div>
                  <p className="text-muted small flex-grow-1">{task.description}</p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className={`badge bg-${priorityColors[task.priority]}`}>{task.priority}</span>
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
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(p => Math.max(1, p - 1))}><ChevronLeft size={16} /></button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}><ChevronRight size={16} /></button>
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