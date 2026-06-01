export const UserRole = {
  UserValue: 0,
  AdminValue: 1,
  User: 'User',
  Admin: 'Admin',
}

export const TaskStatus = {
  Pending: 0,
  InProgress: 1,
  Completed: 2,
}

export const TaskPriority = {
  Low: 0,
  Medium: 1,
  High: 2,
}

export const getRoleLabel = (role) => {
  if (role === UserRole.Admin || role === UserRole.AdminValue) return UserRole.Admin
  return UserRole.User
}

export const isAdminRole = (role) => getRoleLabel(role) === UserRole.Admin
