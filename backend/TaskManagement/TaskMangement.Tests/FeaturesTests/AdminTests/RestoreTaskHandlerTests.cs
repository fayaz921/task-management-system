using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Features.Admin.Commands.RestoreTask;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.AdminTests
{
    public class RestoreTaskHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidCommand_RestoresTask()
        {
            // Arrange
            var db = CreateDbContext();
            var task = new TaskItem { Title = "Deleted Task", UserId = Guid.NewGuid(), DueDate = DateTime.UtcNow.AddDays(1), IsDeleted = true, DeletedAt = DateTime.UtcNow };
            await db.Tasks.AddAsync(task);
            await db.SaveChangesAsync();

            var handler = new RestoreTaskHandler(db);
            var command = new RestoreTaskCommand(task.Id);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.False(result.Data!.IsDeleted);
            Assert.Null(result.Data.DeletedAt);
        }

        [Fact]
        public async Task Handle_InvalidId_ThrowsNotFoundException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new RestoreTaskHandler(db);
            var command = new RestoreTaskCommand(Guid.NewGuid());

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(
                () => handler.Handle(command, CancellationToken.None));
        }
    }
}