using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Domain.Enums;

namespace TaskManagement.API.Features.Tasks.Commands.UpdateTaskStatus
{
    public record UpdateTaskStatusCommand(
        Guid Id,
        Guid UserId,
        TaskItemStatus Status
    ) : IRequest<ApiResponse<TaskDto>>;
}