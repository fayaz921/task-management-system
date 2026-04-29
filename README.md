```markdown
# Task Management System

A full-stack web-based task management system built with ASP.NET Core 10 and React.js.

## Tech Stack

**Backend:**
- ASP.NET Core 10 Web API
- Entity Framework Core
- SQL Server
- MediatR (CQRS Pattern)
- FluentValidation
- Serilog
- JWT Authentication
- BCrypt.Net

**Frontend:**
- React.js
- (coming soon)

## Architecture

This project follows **Vertical Slice Architecture** with **CQRS** pattern using MediatR.

```
TaskManagement.API/
├── Features/         # Vertical slices (Auth, Tasks, Users)
├── Domain/           # Entities and Enums
├── Infrastructure/   # EF Core, JWT, Extensions
└── Common/           # Shared (ApiResponse, Middleware, Behaviors)
```

## Prerequisites

Make sure you have the following installed:

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Node.js](https://nodejs.org/) (for frontend)
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/fayaz921/task-management-system.git
cd task-management-system
```

### 2. Backend Setup

Navigate to the API project:

```bash
cd backend/TaskManagement/TaskManagement.API
```

Update `appsettings.json` with your SQL Server connection string:

```json
"ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=TaskManagementDB;Trusted_Connection=True;TrustServerCertificate=True"
}
```

Run database migrations:

```bash
dotnet ef database update
```

Run the API:

```bash
dotnet run
```

API will be available at `https://localhost:7218`
Swagger UI at `https://localhost:7218/swagger`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend will be available at `http://localhost:3000`

## API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/Auth/register | Register new user | No |
| POST | /api/Auth/login | Login user | No |
| POST | /api/Auth/refresh-token | Refresh JWT token | No |

### Tasks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/Tasks | Create new task | Yes |
| GET | /api/Tasks | Get all user tasks | Yes |
| GET | /api/Tasks/{id} | Get task by id | Yes |
| PUT | /api/Tasks/{id} | Update task | Yes |
| PATCH | /api/Tasks/{id}/status | Update task status | Yes |
| DELETE | /api/Tasks/{id} | Delete task | Yes |

## Environment Variables

| Key | Description |
|-----|-------------|
| ConnectionStrings:DefaultConnection | SQL Server connection string |
| Jwt:Key | JWT secret key |
| Jwt:Issuer | JWT issuer |
| Jwt:Audience | JWT audience |
| Jwt:ExpireDays | JWT expiry in days |

## Features

- ✅ User Authentication with JWT
- ✅ Refresh Token support
- ✅ Role-based Authorization (Admin, User)
- ✅ Task CRUD operations
- ✅ Task status and priority management
- ✅ Global exception handling
- ✅ Request validation with FluentValidation
- ✅ Structured logging with Serilog
- 🔲 User Profile
- 🔲 Dashboard
- 🔲 React.js Frontend

## Author

**Muhammad Fayaz**
Internship Project at 10Pearls Pakistan
```
