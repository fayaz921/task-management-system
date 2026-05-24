import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, CalendarDays, Save } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

export default function UserProfilePage() {
  const [formData, setFormData] = useState({
    fullName: 'Ada Lovelace',
    email: 'ada@taskflow.app'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }, 800)
  }

  return (
    <motion.div className="dash-page" variants={stagger} initial="hidden" animate="show">
      <motion.header variants={fadeUp}>
        <h1>Profile</h1>
        <p className="text-muted">Manage your account settings</p>
      </motion.header>

      <motion.section className="dash-panel" style={{ maxWidth: '500px' }} variants={fadeUp}>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div className="avatar-circle" style={{ width: '64px', height: '64px', fontSize: '1.25rem' }}>
            AL
          </div>
          <div>
            <h5 className="mb-1">{formData.fullName}</h5>
            <span className="badge bg-primary">User</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 text-muted mb-4">
          <CalendarDays size={16} />
          <span>Member since January 2024</span>
        </div>
      </motion.section>

      <motion.section className="dash-panel" variants={fadeUp}>
        <h5 className="mb-4">Edit Profile</h5>
        {success && <div className="alert alert-success mb-3">Profile updated successfully!</div>}
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
            {loading ? <span className="spinner-border spinner-border-sm" /> : <Save size={16} />}
            Save Changes
          </button>
        </form>
      </motion.section>
    </motion.div>
  )
}