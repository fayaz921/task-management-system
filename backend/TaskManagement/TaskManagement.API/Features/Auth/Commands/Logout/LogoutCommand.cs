using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Auth.Commands.Logout
{
    public record LogoutCommand(Guid UserId) : IRequest<ApiResponse<string>>;
}
