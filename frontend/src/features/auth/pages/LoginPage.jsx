import { Link } from 'react-router-dom'
import AuthShell, { Field, PrimaryButton } from '../components/AuthShell'

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to pick up where you left off."
      footer={
        <>
          New to TaskFlow? <Link to="/register">Create an account</Link>
        </>
      }
    >
      <form onSubmit={(event) => event.preventDefault()} className="auth-form">
        <Field label="Email" type="email" placeholder="you@company.com" autoComplete="email" required />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          hint="Forgot password?"
          hintTo="/forgot-password"
          required
        />
        <label className="auth-checkbox">
          <input type="checkbox" />
          <span>Keep me signed in</span>
        </label>
        <PrimaryButton>Sign in</PrimaryButton>
      </form>
    </AuthShell>
  )
}
