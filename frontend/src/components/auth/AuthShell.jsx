import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Check } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

const checklist = [
  'Unlimited tasks & projects on the free plan',
  'Real-time collaboration with your team',
  'Smart priorities that learn how you work',
]

export function Field({ label, hint, hintTo, ...inputProps }) {
  return (
    <div className="mb-3">
      <div className="d-flex align-items-center justify-content-between mb-1">
        <label className="tf-label mb-0">{label}</label>
        {hint && hintTo && (
          <Link to={hintTo} style={{ fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            {hint}
          </Link>
        )}
      </div>
      <input className="tf-input" {...inputProps} />
    </div>
  )
}

export function PrimaryButton({ children }) {
  return (
    <motion.button
      type="submit"
      className="btn btn-gradient w-100 py-3"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      style={{ fontSize: '0.95rem', borderRadius: '12px', border: 'none' }}
    >
      {children}
    </motion.button>
  )
}

export default function AuthShell({ title, subtitle, footer, children }) {
  return (
    <div className="auth-layout">
      {/* Left panel — visible on lg+ */}
      <motion.div
        className="auth-left"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Link to="/" className="d-flex align-items-center gap-2 mb-5 text-decoration-none">
            <div
              className="brand-mark"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Sparkles size={16} />
            </div>
            <span className="fw-black fs-5 text-white" style={{ letterSpacing: '-0.02em' }}>TaskFlow</span>
          </Link>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="text-white mb-3" style={{ fontSize: 'clamp(2rem, 3.2vw, 2.5rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Plan your day.<br />Ship your week.
            </h2>
            <p style={{ opacity: 0.88, fontSize: '0.96rem', lineHeight: 1.6, maxWidth: '380px', marginBottom: '2.5rem' }}>
              Join 50,000+ teams using TaskFlow to bring calm focus to their work.
            </p>

            <motion.div variants={stagger} initial="hidden" animate="show" className="d-flex flex-column gap-3">
              {checklist.map((item) => (
                <motion.div key={item} variants={fadeUp} className="d-flex align-items-center gap-3">
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1.5px solid rgba(255, 255, 255, 0.25)',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#fff',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={11} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.94rem', opacity: 0.94, fontWeight: 500 }}>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: 'auto' }}>
            © 2026 TaskFlow. All rights reserved.
          </p>
        </div>
      </motion.div>

      {/* Right panel — form */}
      <div className="auth-right">
        <motion.div
          className="auth-form-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Mobile-only logo */}
          <div className="d-lg-none mb-4">
            <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
              <div className="brand-mark">
                <Sparkles size={18} />
              </div>
              <span className="fw-black fs-5" style={{ color: 'var(--foreground)' }}>TaskFlow</span>
            </Link>
          </div>

          <h1 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '0.4rem' }}>{title}</h1>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.92rem', marginBottom: '2rem' }}>{subtitle}</p>

          {children}

          {footer && (
            <p className="text-center mt-4" style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem' }}>
              {footer}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
