using MediatR;
using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.ApiResponse;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Infrastructure.Data;

namespace TaskManagement.API.Features.Auth.Register
{
    public class RegisterHandler(AppDbContext db) : IRequestHandler<RegisterCommand, ApiResponse<string>>
    {
        public async Task<ApiResponse<string>> Handle(RegisterCommand command, CancellationToken ct)
        {
            var emailExists = await db.Users.AnyAsync(u => u.Email == command.Email, ct);
            if (emailExists)
                throw new ValidationException(new List<string> { "Email already exists" });

            var user = new User
            {
                FullName = command.FullName,
                Email = command.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(command.Password)
            };

            await db.Users.AddAsync(user, ct);
            await db.SaveChangesAsync(ct);

            return ApiResponse<string>.Created("User registered successfully");
        }
    }

}