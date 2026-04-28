using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Auth.Login
{
    public record LoginCommand(string Email, string Password) : IRequest<ApiResponse<AuthDto>>;


}