using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Features.Tasks;

namespace TaskManagement.API.Features.Admin.Commands.AssignTask
{
    public record AssignTaskCommand(
        Guid UserId,
        string Title,
        string Description,
        TaskItemStatus Status,
        TaskPriority Priority,
        DateTime DueDate
    ) : IRequest<ApiResponse<TaskDto>>;
}