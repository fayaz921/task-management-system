using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Features.Tasks;
using TaskManagement.API.Features.Tasks.Mappings;
using TaskManagement.API.Infrastructure.Data;

namespace TaskManagement.API.Features.Admin.Queries.GetDeletedTasks
{
    public class GetDeletedTasksHandler(AppDbContext db) : IRequestHandler<GetDeletedTasksQuery, ApiResponse<List<TaskDto>>>
    {
        public async Task<ApiResponse<List<TaskDto>>> Handle(GetDeletedTasksQuery query, CancellationToken ct)
        {
            var tasks = await db.Tasks
                .Where(t => t.IsDeleted)
                .Select(t => t.ToDto())
                .ToListAsync(ct);

            return ApiResponse<List<TaskDto>>.Ok(tasks, "Deleted tasks retrieved successfully");
        }
    }
}