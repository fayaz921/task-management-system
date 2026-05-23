import { Link } from 'react-router-dom'
import AuthShell, { Field, PrimaryButton } from '../components/AuthShell'

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter your email and we'll send a reset link."
      footer={
        <>
          Remember your password? <Link to="/login">Back to sign in</Link>
        </>
      }
    >
      <form onSubmit={(event) => event.preventDefault()} className="auth-form">
        <Field label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
        <PrimaryButton>Send reset link</PrimaryButton>
      </form>
    </AuthShell>
  )
}
