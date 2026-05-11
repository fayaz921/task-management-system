using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Features.Tasks.Commands.UpdateTask;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.TasksTests
{
    public class UpdateTaskHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidCommand_UpdatesTask()
        {
            // Arrange
            var db = CreateDbContext();
            var userId = Guid.NewGuid();
            var task = new TaskItem { Title = "Old Title", UserId = userId, DueDate = DateTime.UtcNow.AddDays(1) };
            await db.Tasks.AddAsync(task);
            await db.SaveChangesAsync();

            var handler = new UpdateTaskHandler(db);
            var command = new UpdateTaskCommand(task.Id, userId, "New Title", "New Description", TaskItemStatus.InProgress, TaskPriority.High, DateTime.UtcNow.AddDays(7));

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal("New Title", result.Data!.Title);
        }

        [Fact]
        public async Task Handle_InvalidId_ThrowsNotFoundException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new UpdateTaskHandler(db);
            var command = new UpdateTaskCommand(Guid.NewGuid(), Guid.NewGuid(), "Title", "Description", TaskItemStatus.Pending, TaskPriority.Medium, DateTime.UtcNow.AddDays(7));

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(
                () => handler.Handle(command, CancellationToken.None));
        }
    }
}