using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Auth.Commands.ForgotPassword
{
    public record ForgotPasswordCommand(string Email) : IRequest<ApiResponse<string>>;
}