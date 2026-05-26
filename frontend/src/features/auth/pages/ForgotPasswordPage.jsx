import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell, { Field, PrimaryButton } from '../components/AuthShell'
import useForgotPassword from '../hooks/useForgotPassword'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const { forgotPassword, loading, error, success } = useForgotPassword()

  const handleSubmit = (e) => {
    e.preventDefault()
    forgotPassword({ email })
  }

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
      {success ? (
        <div className="alert alert-success mb-3">
          Reset link sent! Check your email for the OTP code.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <Field
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <div className="text-danger small mt-2">{error}</div>}
          <PrimaryButton>{loading ? 'Sending...' : 'Send reset link'}</PrimaryButton>
        </form>
      )}
    </AuthShell>
  )
}
