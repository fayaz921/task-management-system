using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Features.Tasks;

namespace TaskManagement.API.Features.Admin.Queries.GetDeletedTasks
{
    public record GetDeletedTasksQuery : IRequest<ApiResponse<List<TaskDto>>>;
}