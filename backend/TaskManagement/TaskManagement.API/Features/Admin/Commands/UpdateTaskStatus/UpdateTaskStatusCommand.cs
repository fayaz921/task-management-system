using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Features.Tasks;

namespace TaskManagement.API.Features.Admin.Commands.UpdateTaskStatus
{
    public record AdminUpdateTaskStatusCommand(
        Guid Id,
        TaskItemStatus Status
    ) : IRequest<ApiResponse<TaskDto>>;
}
