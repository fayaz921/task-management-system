using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Tasks.Commands.DeleteTask
{
    public record DeleteTaskCommand(Guid Id, Guid UserId) : IRequest<ApiResponse<string>>;
    
}
