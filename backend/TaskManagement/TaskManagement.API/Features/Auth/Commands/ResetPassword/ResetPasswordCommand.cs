using MediatR;
using TaskManagement.API.Common.ApiResponse;

namespace TaskManagement.API.Features.Auth.Commands.ResetPassword
{
    public record ResetPasswordCommand(
        string Email,
        string OtpCode,
        string NewPassword,
        string ConfirmPassword
    ) : IRequest<ApiResponse<string>>;
}