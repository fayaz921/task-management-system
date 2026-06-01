import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell, { PrimaryButton } from '../components/AuthShell'
import useRegister from '../hooks/useRegister'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const { register, loading, error } = useRegister()

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName) newErrors.fullName = 'Full name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    register(formData)
  }

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
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="auth-field">
          <div>
            <span>Full name</span>
          </div>
          <input
            type="text"
            placeholder="Ada Lovelace"
            autoComplete="name"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </label>
        <label className="auth-field">
          <div>
            <span>Work email</span>
          </div>
          <input
            type="email"
            placeholder="ada@company.com"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
        <label className="auth-field">
          <div>
            <span>Password</span>
          </div>
          <input
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </label>
        <label className="auth-field">
          <div>
            <span>Confirm password</span>
          </div>
          <input
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </label>
        {Object.values(errors).filter(Boolean).map((message) => (
          <div key={message} className="text-danger small mt-1">{message}</div>
        ))}
        {error && <div className="text-danger small mt-2">{error}</div>}
        <p className="auth-disclaimer">By signing up you agree to our Terms of Service and Privacy Policy.</p>
        <PrimaryButton>{loading ? 'Creating account...' : 'Create account'}</PrimaryButton>
      </form>
    </AuthShell>
  )
}
