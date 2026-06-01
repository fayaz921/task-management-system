using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Features.Tasks;
using TaskManagement.API.Features.Tasks.Mappings;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.API.Features.Admin.Commands.UpdateTask
{
    public class UpdateTaskHandler(AppDbContext db) : IRequestHandler<AdminUpdateTaskCommand, ApiResponse<TaskDto>>
    {
        public async Task<ApiResponse<TaskDto>> Handle(AdminUpdateTaskCommand command, CancellationToken ct)
        {
            var task = await db.Tasks.FirstOrDefaultAsync(t => t.Id == command.Id && !t.IsDeleted, ct);
            if (task is null)
                throw new NotFoundException($"Task with id {command.Id} not found");

            task.Title = command.Title;
            task.Description = command.Description;
            task.Status = command.Status;
            task.Priority = command.Priority;
            task.DueDate = command.DueDate;
            task.UpdatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync(ct);

            return ApiResponse<TaskDto>.Ok(task.ToDto(), "Task updated successfully");
        }
    }
}
