using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Admin.Commands.DeleteUser
{
    public record DeleteUserCommand(Guid UserId) : IRequest<ApiResponse<string>>;
}