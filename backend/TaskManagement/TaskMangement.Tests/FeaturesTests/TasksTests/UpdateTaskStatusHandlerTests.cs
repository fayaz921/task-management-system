using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Features.Tasks.Commands.UpdateTaskStatus;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.TasksTests
{
    public class UpdateTaskStatusHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidCommand_UpdatesStatus()
        {
            // Arrange
            var db = CreateDbContext();
            var userId = Guid.NewGuid();
            var task = new TaskItem { Title = "Test Task", UserId = userId, Status = TaskItemStatus.Pending, DueDate = DateTime.UtcNow.AddDays(1) };
            await db.Tasks.AddAsync(task);
            await db.SaveChangesAsync();

            var handler = new UpdateTaskStatusHandler(db);
            var command = new UpdateTaskStatusCommand(task.Id, userId, TaskItemStatus.Completed);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal(TaskItemStatus.Completed, result.Data!.Status);
        }

        [Fact]
        public async Task Handle_InvalidId_ThrowsNotFoundException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new UpdateTaskStatusHandler(db);
            var command = new UpdateTaskStatusCommand(Guid.NewGuid(), Guid.NewGuid(), TaskItemStatus.Completed);

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(
                () => handler.Handle(command, CancellationToken.None));
        }
    }
}