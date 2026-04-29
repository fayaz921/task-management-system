using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Features.Tasks.Mappings;
using TaskManagement.API.Infrastructure.Data;

namespace TaskManagement.API.Features.Tasks.Commands.UpdateTaskStatus
{
    public class UpdateTaskStatusHandler(AppDbContext db) : IRequestHandler<UpdateTaskStatusCommand, ApiResponse<TaskDto>>
    {
        public async Task<ApiResponse<TaskDto>> Handle(UpdateTaskStatusCommand command, CancellationToken ct)
        {
            var task = await db.Tasks.FirstOrDefaultAsync(t => t.Id == command.Id && t.UserId == command.UserId, ct);
            if (task is null)
                throw new NotFoundException($"Task with id {command.Id} not found");

            task.Status = command.Status;
            task.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync(ct);

            return ApiResponse<TaskDto>.Ok(task.ToDto(), "Task status updated successfully");
        }
    }
}