using MediatR;
using TaskManagement.API.Common;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Domain.Enums;

namespace TaskManagement.API.Features.Tasks.Queries.GetTasks
{
    public record GetTasksQuery(
        Guid UserId,
        string? Search,
        TaskItemStatus? Status,
        TaskPriority? Priority,
        int Page = 1,
        int PageSize = 10
    ) : IRequest<ApiResponse<PagedResult<TaskDto>>>;
}