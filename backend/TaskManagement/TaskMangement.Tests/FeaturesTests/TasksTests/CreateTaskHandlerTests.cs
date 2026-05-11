using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Features.Tasks.Commands.CreateTask;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.TasksTests
{
    public class CreateTaskHandlerTests
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
            var handler = new CreateTaskHandler(db);
            var command = new CreateTaskCommand(
                "Test Task",
                "Test Description",
                TaskItemStatus.Pending,
                TaskPriority.Medium,
                DateTime.UtcNow.AddDays(7),
                Guid.NewGuid()
            );

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal("Task created successfully", result.Message);
            Assert.NotNull(result.Data);
        }

        [Fact]
        public async Task Handle_ValidCommand_SavesTaskToDatabase()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new CreateTaskHandler(db);
            var userId = Guid.NewGuid();
            var command = new CreateTaskCommand(
                "Test Task",
                "Test Description",
                TaskItemStatus.Pending,
                TaskPriority.Medium,
                DateTime.UtcNow.AddDays(7),
                userId
            );

            // Act
            await handler.Handle(command, CancellationToken.None);

            // Assert
            var task = await db.Tasks.FirstOrDefaultAsync(t => t.UserId == userId);
            Assert.NotNull(task);
            Assert.Equal("Test Task", task.Title);
        }
    }
}