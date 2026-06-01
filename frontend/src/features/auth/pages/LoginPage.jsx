import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell, { Field, PrimaryButton } from '../components/AuthShell'
import useLogin from '../hooks/useLogin'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const { login, loading, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email ? 'Email is required' : null,
        password: !formData.password ? 'Password is required' : null,
      })
      return
    }
    setErrors({})
    login(formData)
  }

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
      <form onSubmit={handleSubmit} className="auth-form">
        <Field
          label="Email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          hint="Forgot password?"
          hintTo="/forgot-password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        {Object.values(errors).filter(Boolean).map((message) => (
          <div key={message} className="text-danger small mt-1">{message}</div>
        ))}
        {error && <div className="text-danger small mt-2">{error}</div>}
        <PrimaryButton>{loading ? 'Signing in...' : 'Sign in'}</PrimaryButton>
      </form>
    </AuthShell>
  )
}
