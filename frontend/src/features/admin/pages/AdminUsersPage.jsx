import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Trash2, UserCheck } from 'lucide-react'
import ConfirmModal from '../../../shared/components/ConfirmModal'
import Spinner from '../../../shared/components/Spinner'
import useGetAllUsers from '../hooks/useGetAllUsers'
import useDeleteUser from '../hooks/useDeleteUser'
import useUpdateUserRole from '../hooks/useUpdateUserRole'
import { getRoleLabel, isAdminRole, UserRole } from '../../../shared/utils/constants'

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }

export default function AdminUsersPage() {
  const { users, loading, error, refetch } = useGetAllUsers()
  const { deleteUser } = useDeleteUser()
  const { updateUserRole } = useUpdateUserRole()
  const [search, setSearch] = useState('')
  const [roleModal, setRoleModal] = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)
  const [selectedRole, setSelectedRole] = useState('')

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      (u.fullName?.toLowerCase() || '').includes(search.toLowerCase()) || 
      (u.email?.toLowerCase() || '').includes(search.toLowerCase())
    )
  }, [users, search])

  const handleRoleChange = async () => {
    try {
      await updateUserRole(roleModal, selectedRole === UserRole.Admin ? UserRole.AdminValue : UserRole.UserValue)
      refetch()
    } catch (err) {
      console.error('Role update failed:', err)
    }
    setRoleModal(null)
  }

  const handleDelete = async () => {
    try {
      await deleteUser(deleteModal)
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
                          {(user.fullName || '').split(' ').map(n => n[0]).join('')}
                        </div>
                        <span>{user.fullName}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${isAdminRole(user.role) ? 'bg-danger' : 'bg-primary'}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td>{user.createdAt && new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => { setRoleModal(user.id); setSelectedRole(isAdminRole(user.role) ? UserRole.User : UserRole.Admin) }}
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
