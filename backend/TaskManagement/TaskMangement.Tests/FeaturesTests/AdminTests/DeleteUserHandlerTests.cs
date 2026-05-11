using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Features.Admin.Commands.DeleteUser;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.AdminTests
{
    public class DeleteUserHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidUserId_DeletesUser()
        {
            // Arrange
            var db = CreateDbContext();
            var user = new User { FullName = "John Doe", Email = "john@example.com", PasswordHash = "hash" };
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();

            var handler = new DeleteUserHandler(db);
            var command = new DeleteUserCommand(user.Id);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            var deletedUser = await db.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
            Assert.Null(deletedUser);
        }

        [Fact]
        public async Task Handle_InvalidUserId_ThrowsNotFoundException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new DeleteUserHandler(db);
            var command = new DeleteUserCommand(Guid.NewGuid());

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(
                () => handler.Handle(command, CancellationToken.None));
        }
    }
}