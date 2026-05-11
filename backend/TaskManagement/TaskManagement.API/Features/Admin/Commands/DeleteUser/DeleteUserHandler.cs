using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.API.Features.Admin.Commands.DeleteUser
{
    public class DeleteUserHandler(AppDbContext db) : IRequestHandler<DeleteUserCommand, ApiResponse<string>>
    {
        public async Task<ApiResponse<string>> Handle(DeleteUserCommand command, CancellationToken ct)
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Id == command.UserId, ct);
            if (user is null)
                throw new NotFoundException($"User with id {command.UserId} not found");

            db.Users.Remove(user);
            await db.SaveChangesAsync(ct);

            return ApiResponse<string>.Ok("User deleted successfully");
        }
    }
}