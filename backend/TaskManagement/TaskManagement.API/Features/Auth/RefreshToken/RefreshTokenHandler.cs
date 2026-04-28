using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Features.Auth.Login;
using TaskManagement.API.Infrastructure.Data;
using TaskManagement.API.Infrastructure.Services.JWT;

namespace TaskManagement.API.Features.Auth.RefreshToken
{
    public class RefreshTokenHandler(AppDbContext db, ITokenService tokenService)
        : IRequestHandler<RefreshTokenCommand, ApiResponse<AuthDto>>
    {
        public async Task<ApiResponse<AuthDto>> Handle(RefreshTokenCommand command, CancellationToken ct)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.RefreshToken == command.RefreshToken, ct);

            if (user is null || user.RefreshTokenExpiry < DateTime.UtcNow)
                throw new UnauthorizedException("Invalid or expired refresh token");

            var newAccessToken = tokenService.GenerateToken(user);
            var newRefreshToken = tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiry = DateTime.UtcNow.AddDays(30);
            await db.SaveChangesAsync(ct);

            return ApiResponse<AuthDto>.Ok(new AuthDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            }, "Token refreshed successfully");
        }
    }
}