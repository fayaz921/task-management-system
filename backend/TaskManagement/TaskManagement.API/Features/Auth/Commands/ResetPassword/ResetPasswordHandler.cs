using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Infrastructure.Data;

namespace TaskManagement.API.Features.Auth.Commands.ResetPassword
{
    public class ResetPasswordHandler(AppDbContext db)
        : IRequestHandler<ResetPasswordCommand, ApiResponse<string>>
    {
        public async Task<ApiResponse<string>> Handle(ResetPasswordCommand command, CancellationToken ct)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == command.Email, ct);
            if (user is null)
                throw new NotFoundException("User not found");

            if (user.OtpCode != command.OtpCode)
                throw new ValidationException(new List<string> { "Invalid OTP code" });

            if (user.OtpExpiry < DateTime.UtcNow)
                throw new ValidationException(new List<string> { "OTP code has expired" });

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(command.NewPassword);
            user.OtpCode = null;
            user.OtpExpiry = null;

            await db.SaveChangesAsync(ct);

            return ApiResponse<string>.Ok("Password reset successfully");
        }
    }
}