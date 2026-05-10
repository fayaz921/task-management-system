using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Features.Users;
using TaskManagement.API.Features.Users.Mappings;
using TaskManagement.API.Infrastructure.Data;

namespace TaskManagement.API.Features.Admin.Commands.UpdateUserRole
{
    public class UpdateUserRoleHandler(AppDbContext db) : IRequestHandler<UpdateUserRoleCommand, ApiResponse<UserDto>>
    {
        public async Task<ApiResponse<UserDto>> Handle(UpdateUserRoleCommand command, CancellationToken ct)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Id == command.UserId, ct);
            if (user is null)
                throw new NotFoundException($"User with id {command.UserId} not found");

            user.Role = command.Role;
            await db.SaveChangesAsync(ct);

            return ApiResponse<UserDto>.Ok(user.ToDto(), "User role updated successfully");
        }
    }
}