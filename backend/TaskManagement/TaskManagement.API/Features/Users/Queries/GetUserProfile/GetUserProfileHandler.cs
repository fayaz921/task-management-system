using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Features.Users.Mappings;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.API.Features.Users.Queries.GetUserProfile
{
    public class GetUserProfileHandler(AppDbContext db) : IRequestHandler<GetUserProfileQuery, ApiResponse<UserDto>>
    {
        public async Task<ApiResponse<UserDto>> Handle(GetUserProfileQuery query, CancellationToken ct)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Id == query.UserId, ct);
            if (user is null)
                throw new NotFoundException($"User with id {query.UserId} not found");

            return ApiResponse<UserDto>.Ok(user.ToDto(), "User profile retrieved successfully");
        }
    }
}