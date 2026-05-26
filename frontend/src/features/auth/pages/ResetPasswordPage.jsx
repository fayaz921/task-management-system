import { useState } from 'react'
import AuthShell, { Field, PrimaryButton } from '../components/AuthShell'
import useResetPassword from '../hooks/useResetPassword'

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({ email: '', otpCode: '', newPassword: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const { resetPassword, loading, error } = useResetPassword()

  const validate = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.otpCode) newErrors.otpCode = 'OTP code is required'
    if (!formData.newPassword) newErrors.newPassword = 'New password is required'
    if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    resetPassword(formData)
  }

  return (
    <AuthShell title="Set a new password" subtitle="Pick a strong password you haven't used before.">
      <form onSubmit={handleSubmit} className="auth-form">
        <Field
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <Field
          label="OTP Code"
          type="text"
          placeholder="Enter OTP from email"
          value={formData.otpCode}
          onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
          required
        />
        <Field
          label="New Password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={formData.newPassword}
          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          required
        />
        <Field
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />
        {error && <div className="text-danger small mt-2">{error}</div>}
        <PrimaryButton>{loading ? 'Updating...' : 'Update password'}</PrimaryButton>
      </form>
    </AuthShell>
  )
}
