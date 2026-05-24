import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Shield, Trash2, UserCheck } from 'lucide-react'
import ConfirmModal from '../../../shared/components/ConfirmModal'

const mockUsers = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@taskflow.app', role: 'User', createdAt: '2024-01-15' },
  { id: 2, name: 'Priya Patel', email: 'priya@taskflow.app', role: 'User', createdAt: '2024-02-20' },
  { id: 3, name: 'Marcus Chen', email: 'marcus@taskflow.app', role: 'Admin', createdAt: '2024-01-10' },
  { id: 4, name: 'Layla Hassan', email: 'layla@taskflow.app', role: 'User', createdAt: '2024-03-05' },
  { id: 5, name: 'Grace Hopper', email: 'grace@taskflow.app', role: 'Admin', createdAt: '2024-01-05' },
]

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [search, setSearch] = useState('')
  const [roleModal, setRoleModal] = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)
  const [selectedRole, setSelectedRole] = useState('')

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name.toLowerCase().includes(search.toLowerCase()) || 
      u.email.toLowerCase().includes(search.toLowerCase())
    )
  }, [users, search])

  const handleRoleChange = () => {
    setUsers(prev => prev.map(u => u.id === roleModal ? { ...u, role: selectedRole } : u))
    setRoleModal(null)
  }

  const handleDelete = () => {
    setUsers(prev => prev.filter(u => u.id !== deleteModal))
    setDeleteModal(null)
  }

  return (
    <motion.div className="dash-page" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
      <motion.header variants={fadeUp}>
        <h1>User Management</h1>
        <p className="text-muted">Manage all registered users</p>
      </motion.header>

      <motion.section className="dash-panel" variants={fadeUp}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="search-input">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-5">
            <UserCheck size={48} className="text-muted mb-3" />
            <h5>No users found</h5>
            <p className="text-muted">Try adjusting your search</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Member Since</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="avatar-circle" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'Admin' ? 'bg-danger' : 'bg-primary'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => { setRoleModal(user.id); setSelectedRole(user.role === 'Admin' ? 'User' : 'Admin') }}
                        >
                          Change Role
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => setDeleteModal(user.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>

      <ConfirmModal
        title="Change User Role"
        message={`Change this user's role to ${selectedRole}?`}
        onConfirm={handleRoleChange}
        onCancel={() => setRoleModal(null)}
        isOpen={!!roleModal}
      />

      <ConfirmModal
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal(null)}
        isOpen={!!deleteModal}
      />
    </motion.div>
  )
}