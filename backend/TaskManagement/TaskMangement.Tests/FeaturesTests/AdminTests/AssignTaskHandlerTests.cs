using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Features.Admin.Commands.AssignTask;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.AdminTests
{
    public class AssignTaskHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidCommand_AssignsTask()
        {
            // Arrange
            var db = CreateDbContext();
            var user = new User { FullName = "John Doe", Email = "john@example.com", PasswordHash = "hash" };
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();

            var handler = new AssignTaskHandler(db);
            var command = new AssignTaskCommand(user.Id, "Test Task", "Description", TaskItemStatus.Pending, TaskPriority.Medium, DateTime.UtcNow.AddDays(7));

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal("Test Task", result.Data!.Title);
            Assert.Equal(user.Id, result.Data.UserId);
        }

        [Fact]
        public async Task Handle_InvalidUserId_ThrowsNotFoundException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new AssignTaskHandler(db);
            var command = new AssignTaskCommand(Guid.NewGuid(), "Test Task", "Description", TaskItemStatus.Pending, TaskPriority.Medium, DateTime.UtcNow.AddDays(7));

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(
                () => handler.Handle(command, CancellationToken.None));
        }
    }
}