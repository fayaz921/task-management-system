using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Features.Tasks.Mappings;
using TaskManagement.API.Infrastructure.Data;

namespace TaskManagement.API.Features.Tasks.Queries.GetTasks
{
    public class GetTasksHandler(AppDbContext db) : IRequestHandler<GetTasksQuery, ApiResponse<List<TaskDto>>>
    {
        public async Task<ApiResponse<List<TaskDto>>> Handle(GetTasksQuery request, CancellationToken ct)
        {
            var tasks = await db.Tasks
                .Where(t => t.UserId == request.UserId)
                .Select(t => t.ToDto())
                .ToListAsync(ct);

            return ApiResponse<List<TaskDto>>.Ok(tasks, "Tasks retrieved successfully");

        }
    }
}
