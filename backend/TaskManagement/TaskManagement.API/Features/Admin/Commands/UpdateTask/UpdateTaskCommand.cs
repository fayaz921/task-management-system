using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Features.Tasks;

namespace TaskManagement.API.Features.Admin.Commands.UpdateTask
{
    public record AdminUpdateTaskCommand(
        Guid Id,
        string Title,
        string Description,
        TaskItemStatus Status,
        TaskPriority Priority,
        DateTime DueDate
    ) : IRequest<ApiResponse<TaskDto>>;
}
