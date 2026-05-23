import { Link } from 'react-router-dom'
import AuthShell, { PrimaryButton } from '../components/AuthShell'

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Free forever. No credit card required."
      footer={
        <>
          Already have an account? <Link to="/login">Sign in</Link>
        </>
      }
    >
      <form onSubmit={(event) => event.preventDefault()} className="auth-form">
        <div className="auth-name-grid">
          <label className="auth-field">
            <div>
              <span>First name</span>
            </div>
            <input type="text" placeholder="Ada" autoComplete="given-name" required />
          </label>
          <label className="auth-field">
            <div>
              <span>Last name</span>
            </div>
            <input type="text" placeholder="Lovelace" autoComplete="family-name" required />
          </label>
        </div>
        <label className="auth-field">
          <div>
            <span>Work email</span>
          </div>
          <input type="email" placeholder="ada@company.com" autoComplete="email" required />
        </label>
        <label className="auth-field">
          <div>
            <span>Password</span>
          </div>
          <input type="password" placeholder="At least 8 characters" autoComplete="new-password" required />
        </label>
        <p className="auth-disclaimer">By signing up you agree to our Terms of Service and Privacy Policy.</p>
        <PrimaryButton>Create account</PrimaryButton>
      </form>
    </AuthShell>
  )
}
