using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Domain.Enums;

namespace TaskManagement.API.Features.Tasks.Commands.UpdateTask
{
    public record UpdateTaskCommand(
        Guid Id,
        Guid UserId,
        string Title,
        string Description,
        TaskItemStatus Status,
        TaskPriority Priority,
        DateTime DueDate
    ) : IRequest<ApiResponse<TaskDto>>;
}