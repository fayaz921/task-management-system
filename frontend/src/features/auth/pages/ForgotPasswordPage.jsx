import { Link } from 'react-router-dom'
import AuthShell, { Field, PrimaryButton } from '../../../components/auth/AuthShell'

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter your email and we'll send a reset link."
      footer={
        <>
          Remember your password?{' '}
          <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Back to sign in
          </Link>
        </>
      }
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Field label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
        <PrimaryButton>Send reset link</PrimaryButton>
      </form>
    </AuthShell>
  )
}
