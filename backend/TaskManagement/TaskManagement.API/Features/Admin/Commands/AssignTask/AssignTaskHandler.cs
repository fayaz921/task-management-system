using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Features.Tasks;
using TaskManagement.API.Features.Tasks.Mappings;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.API.Features.Admin.Commands.AssignTask
{
    public class AssignTaskHandler(AppDbContext db) : IRequestHandler<AssignTaskCommand, ApiResponse<TaskDto>>
    {
        public async Task<ApiResponse<TaskDto>> Handle(AssignTaskCommand command, CancellationToken ct)
        {
            var userExists = await db.Users.AnyAsync(u => u.Id == command.UserId, ct);
            if (!userExists)
                throw new NotFoundException($"User with id {command.UserId} not found");

            var task = new TaskItem
            {
                Title = command.Title,
                Description = command.Description,
                Status = command.Status,
                Priority = command.Priority,
                DueDate = command.DueDate,
                UserId = command.UserId
            };

            await db.Tasks.AddAsync(task, ct);
            await db.SaveChangesAsync(ct);

            return ApiResponse<TaskDto>.Created(task.ToDto(), "Task assigned successfully");
        }
    }
}