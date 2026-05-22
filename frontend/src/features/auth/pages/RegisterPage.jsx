import { Link } from 'react-router-dom'
import AuthShell, { PrimaryButton } from '../../../components/auth/AuthShell'

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Free forever. No credit card required."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-3">
        {/* Name Fields (Side-by-Side Grid) */}
        <div className="row g-3">
          <div className="col-6">
            <label className="tf-label">First name</label>
            <input
              type="text"
              className="tf-input"
              placeholder="Ada"
              required
              autoComplete="given-name"
            />
          </div>
          <div className="col-6">
            <label className="tf-label">Last name</label>
            <input
              type="text"
              className="tf-input"
              placeholder="Lovelace"
              required
              autoComplete="family-name"
            />
          </div>
        </div>

        {/* Work Email Field */}
        <div>
          <label className="tf-label">Work email</label>
          <input
            type="email"
            className="tf-input"
            placeholder="ada@company.com"
            required
            autoComplete="email"
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="tf-label">Password</label>
          <input
            type="password"
            className="tf-input"
            placeholder="At least 8 characters"
            required
            autoComplete="new-password"
          />
        </div>

        {/* Disclaimer */}
        <p
          className="text-center mb-1"
          style={{
            fontSize: '0.78rem',
            color: 'var(--muted-foreground)',
            lineHeight: 1.5,
          }}
        >
          By signing up you agree to our Terms of Service and Privacy Policy.
        </p>

        <PrimaryButton>Create account</PrimaryButton>
      </form>
    </AuthShell>
  )
}
