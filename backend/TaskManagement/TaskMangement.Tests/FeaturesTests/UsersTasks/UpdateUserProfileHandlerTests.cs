using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Features.Users.Commands.UpdateUserProfile;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.UsersTests
{
    public class UpdateUserProfileHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidCommand_UpdatesProfile()
        {
            // Arrange
            var db = CreateDbContext();
            var user = new User { FullName = "John Doe", Email = "john@example.com", PasswordHash = "hash" };
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();

            var handler = new UpdateUserProfileHandler(db);
            var command = new UpdateUserProfileCommand(user.Id, "Jane Doe", "jane@example.com");

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal("Jane Doe", result.Data!.FullName);
            Assert.Equal("jane@example.com", result.Data.Email);
        }

        [Fact]
        public async Task Handle_InvalidUserId_ThrowsNotFoundException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new UpdateUserProfileHandler(db);
            var command = new UpdateUserProfileCommand(Guid.NewGuid(), "Jane Doe", "jane@example.com");

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(
                () => handler.Handle(command, CancellationToken.None));
        }

        [Fact]
        public async Task Handle_DuplicateEmail_ThrowsValidationException()
        {
            // Arrange
            var db = CreateDbContext();
            var user1 = new User { FullName = "John Doe", Email = "john@example.com", PasswordHash = "hash" };
            var user2 = new User { FullName = "Jane Doe", Email = "jane@example.com", PasswordHash = "hash" };
            await db.Users.AddRangeAsync(user1, user2);
            await db.SaveChangesAsync();

            var handler = new UpdateUserProfileHandler(db);
            var command = new UpdateUserProfileCommand(user1.Id, "John Doe", "jane@example.com");

            // Act & Assert
            await Assert.ThrowsAsync<ValidationException>(
                () => handler.Handle(command, CancellationToken.None));
        }
    }
}