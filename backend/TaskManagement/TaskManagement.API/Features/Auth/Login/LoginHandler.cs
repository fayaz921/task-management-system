using BCrypt.Net;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Net;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Infrastructure.Data;
using TaskManagement.API.Infrastructure.Services.JWT;

namespace TaskManagement.API.Features.Auth.Login
{
    public class LoginHandler(AppDbContext appDbContext,ITokenService tokenService) : IRequestHandler<LoginCommand, ApiResponse<AuthDto>>
    {
        public async Task<ApiResponse<AuthDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var user = await appDbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);
            if (user is null)
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }

            var isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isPasswordValid)
            {
                throw new UnauthorizedAccessException("Invalid email or password");
            }

            var accessToken = tokenService.GenerateToken(user);
            var refreshToken = tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(30);
            await appDbContext.SaveChangesAsync(cancellationToken);

            return ApiResponse<AuthDto>.Ok(new AuthDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            }, "Login successful");
        }
    }
}
