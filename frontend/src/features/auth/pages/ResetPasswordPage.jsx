import AuthShell, { Field, PrimaryButton } from '../../../components/auth/AuthShell'

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Set a new password"
      subtitle="Pick a strong password you haven't used before."
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Field label="New password" type="password" placeholder="••••••••" autoComplete="new-password" />
        <Field label="Confirm password" type="password" placeholder="••••••••" autoComplete="new-password" />
        <PrimaryButton>Update password</PrimaryButton>
      </form>
    </AuthShell>
  )
}
