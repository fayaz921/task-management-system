using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Features.Users;
using TaskManagement.API.Features.Users.Mappings;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.API.Features.Admin.Queries.GetAllUsers
{
    public class GetAllUsersHandler(AppDbContext db) : IRequestHandler<GetAllUsersQuery, ApiResponse<List<UserDto>>>
    {
        public async Task<ApiResponse<List<UserDto>>> Handle(GetAllUsersQuery query, CancellationToken ct)
        {
            var users = await db.Users
                .Select(u => u.ToDto())
                .ToListAsync(ct);

            return ApiResponse<List<UserDto>>.Ok(users, "Users retrieved successfully");
        }
    }
}