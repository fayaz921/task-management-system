using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Admin.Commands.DeleteTask
{
    public record DeleteTaskCommand(Guid Id) : IRequest<ApiResponse<string>>;
}
