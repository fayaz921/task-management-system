using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Features.Auth.Commands.ResetPassword;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.AuthTests
{
    public class ResetPasswordHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidOtp_ResetsPassword()
        {
            // Arrange
            var db = CreateDbContext();
            var user = new User
            {
                FullName = "John Doe",
                Email = "john@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("OldPassword123!"),
                OtpCode = "123456",
                OtpExpiry = DateTime.UtcNow.AddMinutes(10)
            };
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();

            var handler = new ResetPasswordHandler(db);
            var command = new ResetPasswordCommand("john@example.com", "123456", "NewPassword123!", "NewPassword123!");

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            var updatedUser = await db.Users.FirstOrDefaultAsync(u => u.Email == "john@example.com");
            Assert.Null(updatedUser!.OtpCode);
            Assert.Null(updatedUser.OtpExpiry);
        }

        [Fact]
        public async Task Handle_InvalidOtp_ThrowsValidationException()
        {
            // Arrange
            var db = CreateDbContext();
            var user = new User
            {
                FullName = "John Doe",
                Email = "john@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("OldPassword123!"),
                OtpCode = "123456",
                OtpExpiry = DateTime.UtcNow.AddMinutes(10)
            };
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();

            var handler = new ResetPasswordHandler(db);
            var command = new ResetPasswordCommand("john@example.com", "999999", "NewPassword123!", "NewPassword123!");

            // Act & Assert
            await Assert.ThrowsAsync<ValidationException>(
                () => handler.Handle(command, CancellationToken.None));
        }

        [Fact]
        public async Task Handle_ExpiredOtp_ThrowsValidationException()
        {
            // Arrange
            var db = CreateDbContext();
            var user = new User
            {
                FullName = "John Doe",
                Email = "john@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("OldPassword123!"),
                OtpCode = "123456",
                OtpExpiry = DateTime.UtcNow.AddMinutes(-10)
            };
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();

            var handler = new ResetPasswordHandler(db);
            var command = new ResetPasswordCommand("john@example.com", "123456", "NewPassword123!", "NewPassword123!");

            // Act & Assert
            await Assert.ThrowsAsync<ValidationException>(
                () => handler.Handle(command, CancellationToken.None));
        }
    }
}