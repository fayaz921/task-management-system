using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Features.Tasks.Queries.GetTasks;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.TasksTests
{
    public class GetTasksHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ReturnsOnlyUserTasks()
        {
            // Arrange
            var db = CreateDbContext();
            var userId = Guid.NewGuid();
            var otherUserId = Guid.NewGuid();

            await db.Tasks.AddRangeAsync(
                new TaskItem { Title = "Task 1", UserId = userId, DueDate = DateTime.UtcNow.AddDays(1) },
                new TaskItem { Title = "Task 2", UserId = userId, DueDate = DateTime.UtcNow.AddDays(2) },
                new TaskItem { Title = "Task 3", UserId = otherUserId, DueDate = DateTime.UtcNow.AddDays(3) }
            );
            await db.SaveChangesAsync();

            var handler = new GetTasksHandler(db);
            var query = new GetTasksQuery(userId, null, null, null);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal(2, result.Data!.Items.Count);
        }

        [Fact]
        public async Task Handle_FilterByStatus_ReturnsFilteredTasks()
        {
            // Arrange
            var db = CreateDbContext();
            var userId = Guid.NewGuid();

            await db.Tasks.AddRangeAsync(
                new TaskItem { Title = "Task 1", UserId = userId, Status = TaskItemStatus.Pending, DueDate = DateTime.UtcNow.AddDays(1) },
                new TaskItem { Title = "Task 2", UserId = userId, Status = TaskItemStatus.Completed, DueDate = DateTime.UtcNow.AddDays(2) }
            );
            await db.SaveChangesAsync();

            var handler = new GetTasksHandler(db);
            var query = new GetTasksQuery(userId, null, TaskItemStatus.Pending, null);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.Equal(1, result.Data!.Items.Count);
            Assert.Equal("Task 1", result.Data.Items[0].Title);
        }

        [Fact]
        public async Task Handle_SearchByTitle_ReturnsMatchingTasks()
        {
            // Arrange
            var db = CreateDbContext();
            var userId = Guid.NewGuid();

            await db.Tasks.AddRangeAsync(
                new TaskItem { Title = "Buy Milk", UserId = userId, DueDate = DateTime.UtcNow.AddDays(1) },
                new TaskItem { Title = "Go Gym", UserId = userId, DueDate = DateTime.UtcNow.AddDays(2) }
            );
            await db.SaveChangesAsync();

            var handler = new GetTasksHandler(db);
            var query = new GetTasksQuery(userId, "Buy", null, null);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.Equal(1, result.Data!.Items.Count);
            Assert.Equal("Buy Milk", result.Data.Items[0].Title);
        }

        [Fact]
        public async Task Handle_ExcludesSoftDeletedTasks()
        {
            // Arrange
            var db = CreateDbContext();
            var userId = Guid.NewGuid();

            await db.Tasks.AddRangeAsync(
                new TaskItem { Title = "Task 1", UserId = userId, DueDate = DateTime.UtcNow.AddDays(1) },
                new TaskItem { Title = "Task 2", UserId = userId, DueDate = DateTime.UtcNow.AddDays(2), IsDeleted = true }
            );
            await db.SaveChangesAsync();

            var handler = new GetTasksHandler(db);
            var query = new GetTasksQuery(userId, null, null, null);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.Equal(1, result.Data!.Items.Count);
        }
    }
}