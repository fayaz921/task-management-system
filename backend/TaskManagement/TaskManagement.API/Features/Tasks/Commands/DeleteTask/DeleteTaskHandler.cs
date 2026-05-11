using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.API.Features.Tasks.Commands.DeleteTask
{
    public class DeleteTaskHandler(AppDbContext db) : IRequestHandler<DeleteTaskCommand, ApiResponse<string>>
    {
        public async Task<ApiResponse<string>> Handle(DeleteTaskCommand command, CancellationToken ct)
        {
            var task = await db.Tasks
                .FirstOrDefaultAsync(t => t.Id == command.Id && t.UserId == command.UserId && !t.IsDeleted, ct);
            if (task is null)
                throw new NotFoundException($"Task with id {command.Id} not found");

            task.IsDeleted = true;
            task.DeletedAt = DateTime.UtcNow;

            await db.SaveChangesAsync(ct);

            return ApiResponse<string>.Ok("Task deleted successfully");
        }
    }
}