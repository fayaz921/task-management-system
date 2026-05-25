import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="landing-header">
      <div className="landing-container landing-nav">
        <Link to="/" className="landing-brand">
          <span className="landing-brand-mark">
            <Sparkles size={20} />
          </span>
          <span>TaskFlow</span>
        </Link>

        <nav className="landing-nav-links">
          <Link to="/#features">Features</Link>
          <Link to="/why-us">Why us</Link>
          <Link to="/pricing">Pricing</Link>
        </nav>

        <div className="landing-nav-actions">
          <Link to="/login" className="landing-signin">
            Sign in
          </Link>
          <Link to="/register" className="landing-started">
            Get started
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  )
}
