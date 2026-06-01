import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit, Plus, Save, Search, Trash2, X } from 'lucide-react'
import ConfirmModal from '../../../shared/components/ConfirmModal'
import Spinner from '../../../shared/components/Spinner'
import useGetAllTasks from '../hooks/useGetAllTasks'
import useDeleteAdminTask from '../hooks/useDeleteAdminTask'
import useUpdateAdminTask from '../hooks/useUpdateAdminTask'
import useUpdateAdminTaskStatus from '../hooks/useUpdateAdminTaskStatus'

const statusLabels = { 0: 'Pending', 1: 'InProgress', 2: 'Completed' }
const priorityLabels = { 0: 'Low', 1: 'Medium', 2: 'High' }
const statusColors = { 0: 'warning', 1: 'info', 2: 'success' }
const priorityColors = { 0: 'secondary', 1: 'warning', 2: 'danger' }
const emptyEditForm = { title: '', description: '', status: 0, priority: 1, dueDate: '' }

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

export default function AdminTasksPage() {
  const { tasks, loading, error, refetch } = useGetAllTasks()
  const { deleteTask } = useDeleteAdminTask()
  const { updateTask, loading: updateLoading, error: updateError } = useUpdateAdminTask()
  const { updateStatus } = useUpdateAdminTaskStatus()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModal, setDeleteModal] = useState(null)
  const [editingTask, setEditingTask] = useState(null)
  const [editForm, setEditForm] = useState(emptyEditForm)
  const [formErrors, setFormErrors] = useState({})
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

  const openEdit = (task) => {
    setEditingTask(task)
    setEditForm({
      title: task.title || '',
      description: task.description || '',
      status: task.status ?? 0,
      priority: task.priority ?? 1,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    })
    setFormErrors({})
  }

  const validateEdit = () => {
    const errors = {}
    if (!editForm.title.trim()) errors.title = 'Title is required'
    if (!editForm.description.trim()) errors.description = 'Description is required'
    if (!editForm.dueDate) errors.dueDate = 'Due date is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editingTask || !validateEdit()) return
    const result = await updateTask(editingTask.id, editForm)
    if (result?.isSuccess) {
      setEditingTask(null)
      setEditForm(emptyEditForm)
      refetch()
    }
  }

  const handleStatusChange = async (task, status) => {
    try {
      await updateStatus(task.id, status)
      refetch()
    } catch (err) {
      console.error('Status update failed:', err)
    }
  }

  const handlePriorityChange = async (task, priority) => {
    try {
      await updateTask(task.id, { ...task, priority })
      refetch()
    } catch (err) {
      console.error('Priority update failed:', err)
    }
  }

  if (loading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <motion.div className="dash-page" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
      <motion.header variants={fadeUp}>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div>
            <h1>All Tasks</h1>
            <p className="text-muted">View and manage all tasks across the platform</p>
          </div>
          <Link to="/admin/tasks/assign" className="btn btn-primary btn-gradient d-flex align-items-center gap-2">
            <Plus size={16} /> Assign Task
          </Link>
        </div>
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
                  <th>User</th>
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
                    <td><span className="text-muted small">{task.userId}</span></td>
                    <td>
                      <select className={`form-select form-select-sm border-${statusColors[task.status]}`} value={task.status} onChange={e => handleStatusChange(task, e.target.value)}>
                        <option value={0}>Pending</option>
                        <option value={1}>InProgress</option>
                        <option value={2}>Completed</option>
                      </select>
                    </td>
                    <td>
                      <select className={`form-select form-select-sm border-${priorityColors[task.priority]}`} value={task.priority} onChange={e => handlePriorityChange(task, e.target.value)}>
                        <option value={0}>Low</option>
                        <option value={1}>Medium</option>
                        <option value={2}>High</option>
                      </select>
                    </td>
                    <td>{task.dueDate && new Date(task.dueDate).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => openEdit(task)}><Edit size={14} /></button>
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

      {editingTask && (
        <>
          <div className="drawer-overlay" onClick={() => setEditingTask(null)} />
          <motion.div
            className="position-fixed top-50 start-50 translate-middle bg-white rounded-3 p-4"
            style={{ minWidth: '340px', maxWidth: '620px', width: 'calc(100vw - 2rem)', zIndex: 1060, boxShadow: '0 20px 60px -20px rgba(20,19,43,0.3)' }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Edit Task</h5>
              <button className="btn btn-sm btn-ghost" onClick={() => setEditingTask(null)}><X size={16} /></button>
            </div>
            {updateError && <div className="alert alert-danger">{updateError}</div>}
            <form onSubmit={handleEditSubmit} className="d-grid gap-3">
              <div>
                <label className="tf-label">Title</label>
                <input className="tf-input" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
                {formErrors.title && <div className="text-danger small mt-1">{formErrors.title}</div>}
              </div>
              <div>
                <label className="tf-label">Description</label>
                <textarea className="tf-input" rows="3" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                {formErrors.description && <div className="text-danger small mt-1">{formErrors.description}</div>}
              </div>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <label className="tf-label">Status</label>
                  <select className="tf-input" value={editForm.status} onChange={e => setEditForm({ ...editForm, status: Number(e.target.value) })}>
                    <option value={0}>Pending</option>
                    <option value={1}>InProgress</option>
                    <option value={2}>Completed</option>
                  </select>
                </div>
                <div className="col-12 col-md-4">
                  <label className="tf-label">Priority</label>
                  <select className="tf-input" value={editForm.priority} onChange={e => setEditForm({ ...editForm, priority: Number(e.target.value) })}>
                    <option value={0}>Low</option>
                    <option value={1}>Medium</option>
                    <option value={2}>High</option>
                  </select>
                </div>
                <div className="col-12 col-md-4">
                  <label className="tf-label">Due Date</label>
                  <input type="date" className="tf-input" value={editForm.dueDate} onChange={e => setEditForm({ ...editForm, dueDate: e.target.value })} />
                  {formErrors.dueDate && <div className="text-danger small mt-1">{formErrors.dueDate}</div>}
                </div>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-ghost" onClick={() => setEditingTask(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-gradient d-flex align-items-center gap-2" disabled={updateLoading}>
                  {updateLoading ? <Spinner size={16} /> : <Save size={16} />}
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}
