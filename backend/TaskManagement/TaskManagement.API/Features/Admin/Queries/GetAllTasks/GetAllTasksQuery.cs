using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Features.Tasks;

namespace TaskManagement.API.Features.Admin.Queries.GetAllTasks
{
    public record GetAllTasksQuery : IRequest<ApiResponse<List<TaskDto>>>;
}