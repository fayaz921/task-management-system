using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Features.Tasks;
using TaskManagement.API.Features.Tasks.Mappings;
using TaskManagement.API.Infrastructure.Data;

namespace TaskManagement.API.Features.Admin.Commands.RestoreTask
{
    public class RestoreTaskHandler(AppDbContext db) : IRequestHandler<RestoreTaskCommand, ApiResponse<TaskDto>>
    {
        public async Task<ApiResponse<TaskDto>> Handle(RestoreTaskCommand command, CancellationToken ct)
        {
            var task = await db.Tasks
                .FirstOrDefaultAsync(t => t.Id == command.Id && t.IsDeleted, ct);
            if (task is null)
                throw new NotFoundException($"Deleted task with id {command.Id} not found");

            task.IsDeleted = false;
            task.DeletedAt = null;
            task.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync(ct);

            return ApiResponse<TaskDto>.Ok(task.ToDto(), "Task restored successfully");
        }
    }
}