using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.API.Features.Dashboard.Queries.GetDashboard
{
    public class GetDashboardHandler(AppDbContext db) : IRequestHandler<GetDashboardQuery, ApiResponse<DashboardDto>>
    {
        public async Task<ApiResponse<DashboardDto>> Handle(GetDashboardQuery query, CancellationToken ct)
        {
            var tasks = await db.Tasks
                .Where(t => t.UserId == query.UserId && !t.IsDeleted)
                .ToListAsync(ct);

            var dashboard = new DashboardDto
            {
                TotalTasks = tasks.Count,
                PendingTasks = tasks.Count(t => t.Status == TaskItemStatus.Pending),
                InProgressTasks = tasks.Count(t => t.Status == TaskItemStatus.InProgress),
                CompletedTasks = tasks.Count(t => t.Status == TaskItemStatus.Completed)
            };

            return ApiResponse<DashboardDto>.Ok(dashboard, "Dashboard retrieved successfully");
        }
    }
}