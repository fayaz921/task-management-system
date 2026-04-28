using MediatR;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Features.Auth.Login;

namespace TaskManagement.API.Features.Auth.RefreshToken
{
    public record RefreshTokenCommand(string RefreshToken) : IRequest<ApiResponse<AuthDto>>;
}