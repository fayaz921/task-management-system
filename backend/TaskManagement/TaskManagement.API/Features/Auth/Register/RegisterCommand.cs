using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Auth.Register
{
    public record RegisterCommand(
        string FullName,
        string Email,
        string Password,
        string ConfirmPassword
    ) : IRequest<ApiResponse<string>>;
}