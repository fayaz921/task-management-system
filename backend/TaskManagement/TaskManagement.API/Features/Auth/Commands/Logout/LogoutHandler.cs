using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.API.Features.Auth.Commands.Logout
{
    public class LogoutHandler(AppDbContext db) : IRequestHandler<LogoutCommand, ApiResponse<string>>
    {
        public async Task<ApiResponse<string>> Handle(LogoutCommand command, CancellationToken ct)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Id == command.UserId, ct);
            if (user is null)
                throw new UnauthorizedException("User session not found");

            user.RefreshToken = string.Empty;
            user.RefreshTokenExpiry = null;

            await db.SaveChangesAsync(ct);

            return ApiResponse<string>.Ok("Logged out successfully");
        }
    }
}
