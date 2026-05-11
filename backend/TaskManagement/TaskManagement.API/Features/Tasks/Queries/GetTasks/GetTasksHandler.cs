using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Features.Tasks.Mappings;
using TaskManagement.API.Infrastructure.Data;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.API.Features.Tasks.Queries.GetTasks
{
    public class GetTasksHandler(AppDbContext db) : IRequestHandler<GetTasksQuery, ApiResponse<PagedResult<TaskDto>>>
    {
        public async Task<ApiResponse<PagedResult<TaskDto>>> Handle(GetTasksQuery query, CancellationToken ct)
        {
            var tasks = db.Tasks
                .Where(t => t.UserId == query.UserId && !t.IsDeleted);

            if (!string.IsNullOrEmpty(query.Search))
                tasks = tasks.Where(t => t.Title.Contains(query.Search));

            if (query.Status.HasValue)
                tasks = tasks.Where(t => t.Status == query.Status.Value);

            if (query.Priority.HasValue)
                tasks = tasks.Where(t => t.Priority == query.Priority.Value);

            var totalCount = await tasks.CountAsync(ct);

            var items = await tasks
                .Skip((query.Page - 1) * query.PageSize)
                .Take(query.PageSize)
                .Select(t => t.ToDto())
                .ToListAsync(ct);

            var pagedResult = new PagedResult<TaskDto>
            {
                Items = items,
                TotalCount = totalCount,
                Page = query.Page,
                PageSize = query.PageSize
            };

            return ApiResponse<PagedResult<TaskDto>>.Ok(pagedResult, "Tasks retrieved successfully");
        }
    }
}