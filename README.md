# Task Management System

A full-stack task management application built with ASP.NET Core Web API and React. The system supports JWT authentication, role-based dashboards, user task management, admin task assignment, soft deletion, profile management, and password reset through email OTP.

## Tech Stack

**Backend**

- ASP.NET Core 10 Web API
- Entity Framework Core 10
- SQL Server
- MediatR with CQRS
- FluentValidation
- JWT authentication and refresh tokens
- Role-based authorization
- BCrypt.Net password hashing
- MailKit email service
- Serilog logging
- Swagger/OpenAPI

**Frontend**

- React 19
- Vite
- React Router
- Zustand
- Axios
- Bootstrap
- Framer Motion
- Lucide React icons

## Project Structure

```text
task-management-system/
+-- backend/
|   +-- TaskManagement/
|       +-- TaskManagement.API/
|       |   +-- Features/          # Vertical slices: Auth, Tasks, Users, Admin, Dashboard
|       |   +-- Domain/            # Entities and enums
|       |   +-- Infrastructure/    # EF Core, JWT, email, CORS, Swagger, extensions
|       |   +-- Common/            # ApiResponse, middleware, exceptions, behaviors
|       +-- TaskMangement.Tests/   # Backend unit tests
+-- frontend/
    +-- src/
    |   +-- features/              # Feature-based React modules
    |   +-- layouts/               # Public, auth, user, and admin layouts
    |   +-- lib/                   # Axios client
    |   +-- routes/                # Route guards and route configuration
    |   +-- shared/                # Shared UI and constants
    +-- package.json
```

The backend follows Vertical Slice Architecture. Each feature owns its commands, queries, handlers, DTOs, validators, mappings, and controller logic where applicable.

## Features

- User registration and login
- JWT access token authentication
- Refresh token flow
- Backend logout that invalidates refresh tokens
- Forgot password and reset password using OTP
- User profile view and update
- User dashboard with task statistics
- User task CRUD
- Task filtering, pagination, status, priority, and due dates
- Smart user views for Inbox, Today, and Starred tasks
- Admin dashboard with live platform metrics
- Admin user management
- Admin task assignment to users
- Admin task edit, status update, priority update, delete, and restore
- Soft delete for tasks
- Protected routes and admin-only routes
- Swagger API documentation

## Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Node.js](https://nodejs.org/)
- Git

## Backend Setup

From the repository root:

```bash
cd backend/TaskManagement/TaskManagement.API
```

Update the connection string in `appsettings.Development.json` for your SQL Server:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=TaskManagementDB;Trusted_Connection=True;TrustServerCertificate=True"
}
```

Configure JWT and email settings in `appsettings.Development.json`:

```json
"Jwt": {
  "Key": "YOUR_LONG_SECRET_KEY",
  "Issuer": "TaskManagement.API",
  "Audience": "TaskManagement.Client",
  "ExpireDays": 7
}
```

Apply database migrations:

```bash
dotnet ef database update
```

Run the API:

```bash
dotnet run --launch-profile https
```

Backend URLs:

- API: `https://localhost:7218`
- Swagger: `https://localhost:7218/swagger`
- HTTP profile: `http://localhost:5069`

## Frontend Setup

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

- `http://localhost:5173`

The frontend Axios client points to:

```text
https://localhost:7218/api
```

Make sure the backend is running on the HTTPS profile before using the frontend.

## Useful Commands

Backend:

```bash
dotnet build backend/TaskManagement/TaskManagement.API/TaskManagement.API.csproj
dotnet test backend/TaskManagement/TaskMangement.Tests/TaskMangement.Tests.csproj
```

Frontend:

```bash
cd frontend
npm run lint
npm run build
npm run preview
```

## API Overview

All successful API responses use a common wrapper:

```json
{
  "data": {},
  "isSuccess": true,
  "message": "Success",
  "status": "OK"
}
```

### Auth

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| POST | `/api/Auth/register` | Register a user | No |
| POST | `/api/Auth/login` | Login and receive tokens | No |
| POST | `/api/Auth/refresh-token` | Refresh access token | No |
| POST | `/api/Auth/logout` | Logout and invalidate refresh token | Yes |
| POST | `/api/Auth/forgot-password` | Send password reset OTP | No |
| POST | `/api/Auth/reset-password` | Reset password with OTP | No |

### User Tasks

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| GET | `/api/Tasks` | Get paged/filterable user tasks | Yes |
| POST | `/api/Tasks` | Create a task | Yes |
| GET | `/api/Tasks/{id}` | Get task details | Yes |
| PUT | `/api/Tasks/{id}` | Update task | Yes |
| PATCH | `/api/Tasks/{id}/status` | Update task status | Yes |
| DELETE | `/api/Tasks/{id}` | Soft delete task | Yes |

### Profile and Dashboard

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| GET | `/api/Users/profile` | Get current user profile | Yes |
| PUT | `/api/Users/profile` | Update current user profile | Yes |
| GET | `/api/Dashboard` | Get user dashboard statistics | Yes |

### Admin

Admin endpoints require the `Admin` role.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/Admin/dashboard` | Get admin dashboard metrics |
| GET | `/api/Admin/users` | Get all users |
| DELETE | `/api/Admin/users/{userId}` | Delete a user |
| PATCH | `/api/Admin/users/{userId}/role` | Update user role |
| GET | `/api/Admin/tasks` | Get all active tasks |
| POST | `/api/Admin/tasks/assign` | Create and assign task to a user |
| PUT | `/api/Admin/tasks/{id}` | Admin update task |
| PATCH | `/api/Admin/tasks/{id}/status` | Admin update task status |
| DELETE | `/api/Admin/tasks/{id}` | Admin soft delete task |
| GET | `/api/Admin/tasks/deleted` | Get deleted tasks |
| PATCH | `/api/Admin/tasks/{id}/restore` | Restore deleted task |

## Roles

- `User`: Can manage their own tasks and profile.
- `Admin`: Can access admin dashboard, manage users, assign tasks, update tasks, delete tasks, and restore deleted tasks.

## Notes

- CORS is configured for `http://localhost:5173`.
- Tasks are soft deleted, so deleted tasks can be restored by an admin.
- Swagger is available only in development.
- Do not commit real production secrets in `appsettings` files. Use environment variables or user secrets for production-style deployments.

## Author

**Muhammad Fayaz**  
Internship Project at 10Pearls Pakistan
