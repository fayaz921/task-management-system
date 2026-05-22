import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`landing-navbar ${scrolled ? 'scrolled' : ''}`}
      style={{
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
      }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <div
            className="brand-mark"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              background: 'var(--gradient-hero)',
              color: 'var(--primary-foreground)',
            }}
          >
            <Sparkles size={16} />
          </div>
          <span className="fw-black fs-5" style={{ color: 'var(--foreground)', letterSpacing: '-0.02em' }}>TaskFlow</span>
        </Link>

        <div className="d-none d-md-flex align-items-center gap-4">
          {['Features', 'Why us', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-decoration-none"
              style={{
                color: 'var(--muted-foreground)',
                fontWeight: 500,
                fontSize: '0.92rem',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--foreground)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--muted-foreground)')}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="d-flex align-items-center gap-3">
          <Link to="/login" className="text-decoration-none" style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '0.92rem' }}>
            Sign in
          </Link>
          <Link to="/register">
            <button
              className="btn btn-sm d-flex align-items-center gap-1.5"
              style={{
                background: '#0f172a',
                color: '#fff',
                borderRadius: '999px',
                padding: '0.55rem 1.15rem',
                fontSize: '0.88rem',
                fontWeight: 600,
                border: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.9'
                e.target.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1'
                e.target.style.transform = 'translateY(0)'
              }}
            >
              Get started <ArrowRight size={14} style={{ marginLeft: '4px' }} />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

