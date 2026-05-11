using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Features.Auth.Commands.Register;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.AuthTests
{
    public class RegisterHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidCommand_ReturnsSuccess()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new RegisterHandler(db);
            var command = new RegisterCommand("John Doe", "john@example.com", "Password123!", "Password123!");

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal("User registered successfully", result.Message);
        }

        [Fact]
        public async Task Handle_DuplicateEmail_ThrowsValidationException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new RegisterHandler(db);
            var command = new RegisterCommand("John Doe", "john@example.com", "Password123!", "Password123!");
            await handler.Handle(command, CancellationToken.None);

            // Act & Assert
            await Assert.ThrowsAsync<ValidationException>(
                () => handler.Handle(command, CancellationToken.None));
        }

        [Fact]
        public async Task Handle_ValidCommand_SavesUserToDatabase()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new RegisterHandler(db);
            var command = new RegisterCommand("John Doe", "john@example.com", "Password123!", "Password123!");

            // Act
            await handler.Handle(command, CancellationToken.None);

            // Assert
            var user = await db.Users.FirstOrDefaultAsync(u => u.Email == "john@example.com");
            Assert.NotNull(user);
            Assert.Equal("John Doe", user.FullName);
        }
    }
}