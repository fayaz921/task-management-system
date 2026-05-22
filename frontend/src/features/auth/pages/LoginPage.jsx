import { Link } from 'react-router-dom'
import AuthShell, { Field, PrimaryButton } from '../../../components/auth/AuthShell'

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to pick up where you left off."
      footer={
        <>
          New to TaskFlow?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={(e) => e.preventDefault()} className="d-flex flex-column gap-2">
        <Field
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          hint="Forgot password?"
          hintTo="/forgot-password"
          required
        />
        
        {/* Keep me signed in Checkbox */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <input
            type="checkbox"
            id="keep-signed-in"
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '4px',
              border: '1.5px solid var(--border)',
              accentColor: 'var(--primary)',
              cursor: 'pointer',
            }}
          />
          <label
            htmlFor="keep-signed-in"
            style={{
              fontSize: '0.84rem',
              color: 'var(--muted-foreground)',
              fontWeight: 500,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            Keep me signed in
          </label>
        </div>

        <PrimaryButton>Sign in</PrimaryButton>
      </form>
    </AuthShell>
  )
}
