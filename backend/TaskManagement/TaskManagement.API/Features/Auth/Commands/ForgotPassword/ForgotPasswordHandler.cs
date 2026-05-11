using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Infrastructure.Persistence.Data;
using TaskManagement.API.Infrastructure.Services.Email;

namespace TaskManagement.API.Features.Auth.Commands.ForgotPassword
{
    public class ForgotPasswordHandler(AppDbContext db, IEmailService emailService)
        : IRequestHandler<ForgotPasswordCommand, ApiResponse<string>>
    {
        public async Task<ApiResponse<string>> Handle(ForgotPasswordCommand command, CancellationToken ct)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == command.Email, ct);
            if (user is null)
                return ApiResponse<string>.Ok("If your email exists you will receive an OTP shortly");

            var otp = new Random().Next(100000, 999999).ToString();

            user.OtpCode = otp;
            user.OtpExpiry = DateTime.UtcNow.AddMinutes(10);
            await db.SaveChangesAsync(ct);

            await emailService.SendOtpEmailAsync(user.Email, user.FullName, otp);

            return ApiResponse<string>.Ok("If your email exists you will receive an OTP shortly");
        }
    }
}