using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Features.Admin.Commands.UpdateUserRole;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.AdminTests
{
    public class UpdateUserRoleHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidCommand_UpdatesRole()
        {
            // Arrange
            var db = CreateDbContext();
            var user = new User { FullName = "John Doe", Email = "john@example.com", PasswordHash = "hash", Role = UserRole.User };
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();

            var handler = new UpdateUserRoleHandler(db);
            var command = new UpdateUserRoleCommand(user.Id, UserRole.Admin);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal(UserRole.Admin, result.Data!.Role);
        }

        [Fact]
        public async Task Handle_InvalidUserId_ThrowsNotFoundException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new UpdateUserRoleHandler(db);
            var command = new UpdateUserRoleCommand(Guid.NewGuid(), UserRole.Admin);

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(
                () => handler.Handle(command, CancellationToken.None));
        }
    }
}