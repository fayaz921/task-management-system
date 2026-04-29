using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Features.Tasks.Mappings;
using TaskManagement.API.Infrastructure.Data;

namespace TaskManagement.API.Features.Tasks.Queries.GetTaskById
{
    public class GetTaskByIdHandler(AppDbContext db) : IRequestHandler<GetTaskByIdQuery, ApiResponse<TaskDto>>
    {
        public async Task<ApiResponse<TaskDto>> Handle(GetTaskByIdQuery query, CancellationToken ct)
        {
            var task = await db.Tasks.FirstOrDefaultAsync(t => t.Id == query.Id && t.UserId == query.UserId, ct);
            if (task is null)
                throw new NotFoundException($"Task with id {query.Id} not found");

            return ApiResponse<TaskDto>.Ok(task.ToDto(), "Task retrieved successfully");
        }
    }
}