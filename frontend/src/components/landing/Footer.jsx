import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const productLinks = ['Tasks', 'Inbox', 'Calendar', 'Integrations']
const companyLinks = ['About', 'Blog', 'Careers', 'Press']
const legalLinks = ['Privacy', 'Terms', 'Security']

export default function Footer() {
  return (
    <footer className="landing-footer">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4 mb-3">
            <Link to="/" className="d-flex align-items-center gap-2 mb-3 text-decoration-none">
              <div className="brand-mark" style={{ width: 32, height: 32 }}>
                <Sparkles size={16} />
              </div>
              <span className="fw-black fs-5" style={{ color: 'var(--foreground)' }}>TaskFlow</span>
            </Link>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem', maxWidth: 280, lineHeight: 1.7 }}>
              The modern task management platform that helps teams stay focused and productive.
            </p>
          </div>

          <div className="col-6 col-lg-2 offset-lg-1">
            <h6 style={{ fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', color: 'var(--foreground)' }}>Product</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {productLinks.map(l => (
                <li key={l}><a href="#" style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem' }}>{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h6 style={{ fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', color: 'var(--foreground)' }}>Company</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {companyLinks.map(l => (
                <li key={l}><a href="#" style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem' }}>{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h6 style={{ fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', color: 'var(--foreground)' }}>Legal</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {legalLinks.map(l => (
                <li key={l}><a href="#" style={{ color: 'var(--muted-foreground)', fontSize: '0.88rem' }}>{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between pt-4 mt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <span style={{ color: 'var(--muted-foreground)', fontSize: '0.82rem' }}>© 2026 TaskFlow. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
