namespace TaskManagement.API.Infrastructure.Services.Email
{
    public interface IEmailService
    {
        Task SendOtpEmailAsync(string toEmail, string fullName, string otpCode);
    }
}