using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Features.Users.Mappings;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.API.Features.Users.Commands.UpdateUserProfile
{
    public class UpdateUserProfileHandler(AppDbContext db) : IRequestHandler<UpdateUserProfileCommand, ApiResponse<UserDto>>
    {
        public async Task<ApiResponse<UserDto>> Handle(UpdateUserProfileCommand command, CancellationToken ct)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Id == command.Id, ct);
            if (user is null)
                throw new NotFoundException($"User with id {command.Id} not found");

            var emailExists = await db.Users.AnyAsync(u => u.Email == command.Email && u.Id != command.Id, ct);
            if (emailExists)
                throw new ValidationException(new List<string> { "Email already in use by another account" });

            user.FullName = command.FullName;
            user.Email = command.Email;

            await db.SaveChangesAsync(ct);

            return ApiResponse<UserDto>.Ok(user.ToDto(), "User profile updated successfully");
        }
    }
}