using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Domain.Enums;

namespace TaskManagement.API.Features.Tasks.Commands.CreateTask
{
    public record CreateTaskCommand(
        string Title,
        string Description,
        TaskItemStatus Status,
        TaskPriority Priority,
        DateTime DueDate,
        Guid UserId
    ) : IRequest<ApiResponse<TaskDto>>;
}