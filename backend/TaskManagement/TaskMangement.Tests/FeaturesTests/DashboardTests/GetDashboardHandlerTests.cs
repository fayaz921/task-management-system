using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Domain.Enums;
using TaskManagement.API.Features.Dashboard.Queries.GetDashboard;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.DashboardTests
{
    public class GetDashboardHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ReturnsCorrectTaskCounts()
        {
            // Arrange
            var db = CreateDbContext();
            var userId = Guid.NewGuid();

            await db.Tasks.AddRangeAsync(
                new TaskItem { Title = "Task 1", UserId = userId, Status = TaskItemStatus.Pending, DueDate = DateTime.UtcNow.AddDays(1) },
                new TaskItem { Title = "Task 2", UserId = userId, Status = TaskItemStatus.InProgress, DueDate = DateTime.UtcNow.AddDays(2) },
                new TaskItem { Title = "Task 3", UserId = userId, Status = TaskItemStatus.Completed, DueDate = DateTime.UtcNow.AddDays(3) },
                new TaskItem { Title = "Task 4", UserId = userId, Status = TaskItemStatus.Pending, DueDate = DateTime.UtcNow.AddDays(4) }
            );
            await db.SaveChangesAsync();

            var handler = new GetDashboardHandler(db);
            var query = new GetDashboardQuery(userId);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal(4, result.Data!.TotalTasks);
            Assert.Equal(2, result.Data.PendingTasks);
            Assert.Equal(1, result.Data.InProgressTasks);
            Assert.Equal(1, result.Data.CompletedTasks);
        }

        [Fact]
        public async Task Handle_ExcludesSoftDeletedTasks()
        {
            // Arrange
            var db = CreateDbContext();
            var userId = Guid.NewGuid();

            await db.Tasks.AddRangeAsync(
                new TaskItem { Title = "Task 1", UserId = userId, Status = TaskItemStatus.Pending, DueDate = DateTime.UtcNow.AddDays(1) },
                new TaskItem { Title = "Task 2", UserId = userId, Status = TaskItemStatus.Pending, DueDate = DateTime.UtcNow.AddDays(2), IsDeleted = true }
            );
            await db.SaveChangesAsync();

            var handler = new GetDashboardHandler(db);
            var query = new GetDashboardQuery(userId);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.Equal(1, result.Data!.TotalTasks);
        }
    }
}