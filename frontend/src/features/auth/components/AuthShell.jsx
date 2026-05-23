import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CircleCheck, Sparkles } from 'lucide-react'

const checklist = [
  'Unlimited tasks & projects on the free plan',
  'Real-time collaboration with your team',
  'Smart priorities that learn how you work',
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export function Field({ label, hint, hintTo, ...inputProps }) {
  return (
    <label className="auth-field">
      <div>
        <span>{label}</span>
        {hint && hintTo && <Link to={hintTo}>{hint}</Link>}
      </div>
      <input {...inputProps} />
    </label>
  )
}

export function PrimaryButton({ children }) {
  return (
    <motion.button type="submit" className="auth-primary-button" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
      {children}
    </motion.button>
  )
}

function AuthBrand({ mobile = false }) {
  return (
    <Link to="/" className={mobile ? 'auth-mobile-brand' : 'auth-brand'}>
      <span>
        <Sparkles size={20} />
      </span>
      <strong>TaskFlow</strong>
    </Link>
  )
}

export default function AuthShell({ title, subtitle, footer, children }) {
  return (
    <main className="auth-layout">
      <aside className="auth-left">
        <div className="auth-pattern" aria-hidden="true" />
        <AuthBrand />

        <motion.div className="auth-left-copy" variants={fadeUp} initial="hidden" animate="show">
          <h2>
            Plan your day.
            <br />
            Ship your week.
          </h2>
          <p>Join 50,000+ teams using TaskFlow to bring calm focus to their work.</p>
          <ul>
            {checklist.map((item) => (
              <li key={item}>
                <CircleCheck size={16} />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="auth-copyright">© 2026 TaskFlow. All rights reserved.</p>
      </aside>

      <section className="auth-right">
        <motion.div
          className="auth-form-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <AuthBrand mobile />
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {children}
          {footer && <div className="auth-footer-text">{footer}</div>}
        </motion.div>
      </section>
    </main>
  )
}
