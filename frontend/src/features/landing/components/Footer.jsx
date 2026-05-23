import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-container landing-footer-inner">
        <Link to="/" className="landing-footer-brand">
          <span>
            <Sparkles size={16} />
          </span>
          TaskFlow
        </Link>
        <p>© 2026 TaskFlow. All rights reserved.</p>
      </div>
    </footer>
  )
}
