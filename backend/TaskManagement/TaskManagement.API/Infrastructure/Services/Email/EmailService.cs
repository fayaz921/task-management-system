using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace TaskManagement.API.Infrastructure.Services.Email
{
    public class EmailService(IOptions<EmailSettings> emailSettings) : IEmailService
    {
        private readonly EmailSettings _emailSettings = emailSettings.Value;

        public async Task SendOtpEmailAsync(string toEmail, string fullName, string otpCode)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_emailSettings.FromName, _emailSettings.Username));
            email.To.Add(new MailboxAddress(fullName, toEmail));
            email.Subject = "Password Reset OTP — Task Management System";

            email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = GetOtpEmailTemplate(fullName, otpCode)
            };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_emailSettings.Host, _emailSettings.Port, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(_emailSettings.Username, _emailSettings.Password);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

        private static string GetOtpEmailTemplate(string fullName, string otpCode)
        {
            return $@"
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Password Reset OTP</title>
</head>
<body style='margin:0; padding:0; background-color:#f4f6f9; font-family: Arial, sans-serif;'>
    <table width='100%' cellpadding='0' cellspacing='0' style='background-color:#f4f6f9; padding: 40px 0;'>
        <tr>
            <td align='center'>
                <table width='600' cellpadding='0' cellspacing='0' style='background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);'>
                    
                    <!-- Header -->
                    <tr>
                        <td style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align:center;'>
                            <h1 style='color:#ffffff; margin:0; font-size:28px; font-weight:700;'>Task Management</h1>
                            <p style='color:rgba(255,255,255,0.85); margin:8px 0 0 0; font-size:14px;'>Password Reset Request</p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style='padding: 40px;'>
                            <p style='color:#374151; font-size:16px; margin:0 0 16px 0;'>Hi <strong>{fullName}</strong>,</p>
                            <p style='color:#6b7280; font-size:15px; line-height:1.6; margin:0 0 24px 0;'>
                                We received a request to reset your password. Use the OTP code below to complete the process.
                                This code is valid for <strong>10 minutes</strong>.
                            </p>

                            <!-- OTP Box -->
                            <table width='100%' cellpadding='0' cellspacing='0'>
                                <tr>
                                    <td align='center' style='padding: 20px 0;'>
                                        <div style='background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); border-radius:12px; padding:30px 40px; display:inline-block;'>
                                            <p style='margin:0 0 8px 0; color:#6b7280; font-size:13px; text-transform:uppercase; letter-spacing:2px;'>Your OTP Code</p>
                                            <p style='margin:0; color:#1f2937; font-size:42px; font-weight:800; letter-spacing:12px;'>{otpCode}</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style='color:#6b7280; font-size:14px; line-height:1.6; margin:24px 0 0 0;'>
                                If you did not request a password reset, please ignore this email or contact support if you have concerns.
                            </p>

                            <hr style='border:none; border-top:1px solid #e5e7eb; margin:32px 0;'>

                            <p style='color:#9ca3af; font-size:13px; margin:0; text-align:center;'>
                                This is an automated email. Please do not reply to this email.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style='background-color:#f9fafb; padding:24px 40px; text-align:center; border-top:1px solid #e5e7eb;'>
                            <p style='color:#9ca3af; font-size:12px; margin:0;'>
                                © 2026 Task Management System. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>";
        }
    }
}