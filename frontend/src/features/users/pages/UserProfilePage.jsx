import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, CalendarDays, Save } from 'lucide-react'
import Spinner from '../../../shared/components/Spinner'
import useGetUserProfile from '../hooks/useGetUserProfile'
import useUpdateUserProfile from '../hooks/useUpdateUserProfile'

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function UserProfilePage() {
  const { profile, loading: fetchLoading, error: fetchError } = useGetUserProfile()
  const { updateProfile, loading, error } = useUpdateUserProfile()
  const [formData, setFormData] = useState({ fullName: '', email: '' })

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        email: profile.email || ''
      })
    }
  }, [profile])

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formData)
  }

  if (fetchLoading) return <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}><Spinner /></div>
  if (fetchError) return <div className="alert alert-danger">{fetchError}</div>

  return (
    <motion.div className="dash-page" variants={stagger} initial="hidden" animate="show">
      <motion.header variants={fadeUp}>
        <h1>Profile</h1>
        <p className="text-muted">Manage your account settings</p>
      </motion.header>

      <motion.section className="dash-panel" style={{ maxWidth: '500px' }} variants={fadeUp}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="avatar-circle" style={{ width: '64px', height: '64px', fontSize: '1.25rem' }}>
            {profile?.fullName?.split(' ').map(n => n[0]).join('') || 'U'}
          </div>
          <div>
            <h5 className="mb-1">{profile?.fullName}</h5>
            <span className="badge bg-primary">{profile?.role || 'User'}</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 text-muted mb-4">
          <CalendarDays size={16} />
          <span>Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : ''}</span>
        </div>
      </motion.section>

      <motion.section className="dash-panel" variants={fadeUp}>
        <h5 className="mb-4">Edit Profile</h5>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="d-grid gap-3">
          <div>
            <label className="tf-label">Full Name</label>
            <div className="position-relative">
              <User size={18} className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)', zIndex: 1 }} />
              <input
                type="text"
                className="tf-input"
                style={{ paddingLeft: '40px' }}
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="tf-label">Email</label>
            <div className="position-relative">
              <Mail size={18} className="position-absolute" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)', zIndex: 1 }} />
              <input
                type="email"
                className="tf-input"
                style={{ paddingLeft: '40px' }}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-gradient d-flex align-items-center justify-content-center gap-2" disabled={loading}>
            {loading ? <Spinner size={16} /> : <Save size={16} />}
            Save Changes
          </button>
        </form>
      </motion.section>
    </motion.div>
  )
}