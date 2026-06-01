using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.API.Features.Admin.Queries.GetAdminDashboard
{
    public class GetAdminDashboardHandler(AppDbContext db) : IRequestHandler<GetAdminDashboardQuery, ApiResponse<AdminDashboardDto>>
    {
        public async Task<ApiResponse<AdminDashboardDto>> Handle(GetAdminDashboardQuery query, CancellationToken ct)
        {
            var totalUsers = await db.Users.CountAsync(ct);
            var activeTasks = await db.Tasks.CountAsync(t => !t.IsDeleted, ct);
            var deletedTasks = await db.Tasks.CountAsync(t => t.IsDeleted, ct);
            var completedTasks = await db.Tasks.CountAsync(t => !t.IsDeleted && t.Status == TaskItemStatus.Completed, ct);

            var recentUsers = await db.Users
                .OrderByDescending(u => u.CreatedAt)
                .Take(3)
                .Select(u => new AdminActivityDto
                {
                    Actor = u.FullName,
                    Text = "joined the platform",
                    Time = u.CreatedAt
                })
                .ToListAsync(ct);

            var recentTasks = await db.Tasks
                .OrderByDescending(t => t.DeletedAt ?? t.UpdatedAt ?? t.CreatedAt)
                .Take(5)
                .Select(t => new AdminActivityDto
                {
                    Actor = "Task",
                    Text = t.IsDeleted ? $"deleted '{t.Title}'" : $"updated '{t.Title}'",
                    Time = t.DeletedAt ?? t.UpdatedAt ?? t.CreatedAt
                })
                .ToListAsync(ct);

            var dashboard = new AdminDashboardDto
            {
                TotalUsers = totalUsers,
                ActiveTasks = activeTasks,
                DeletedTasks = deletedTasks,
                CompletedTasks = completedTasks,
                RecentActivity = recentUsers
                    .Concat(recentTasks)
                    .OrderByDescending(a => a.Time)
                    .Take(6)
                    .ToList()
            };

            return ApiResponse<AdminDashboardDto>.Ok(dashboard, "Admin dashboard retrieved successfully");
        }
    }
}
