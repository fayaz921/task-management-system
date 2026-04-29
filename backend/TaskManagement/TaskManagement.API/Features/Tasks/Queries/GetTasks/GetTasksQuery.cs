using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Tasks.Queries.GetTasks
{
    public record GetTasksQuery(Guid UserId) : IRequest<ApiResponse<List<TaskDto>>>;
    
    
}
