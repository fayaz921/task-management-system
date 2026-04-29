using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Tasks.Queries.GetTaskById
{
    public record GetTaskByIdQuery(Guid Id, Guid UserId) : IRequest<ApiResponse<TaskDto>>;
    
}
