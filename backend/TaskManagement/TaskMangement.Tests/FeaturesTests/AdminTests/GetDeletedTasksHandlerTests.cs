using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Features.Admin.Queries.GetDeletedTasks;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.AdminTests
{
    public class GetDeletedTasksHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ReturnsOnlyDeletedTasks()
        {
            // Arrange
            var db = CreateDbContext();
            await db.Tasks.AddRangeAsync(
                new TaskItem { Title = "Task 1", UserId = Guid.NewGuid(), DueDate = DateTime.UtcNow.AddDays(1) },
                new TaskItem { Title = "Task 2", UserId = Guid.NewGuid(), DueDate = DateTime.UtcNow.AddDays(2), IsDeleted = true },
                new TaskItem { Title = "Task 3", UserId = Guid.NewGuid(), DueDate = DateTime.UtcNow.AddDays(3), IsDeleted = true }
            );
            await db.SaveChangesAsync();

            var handler = new GetDeletedTasksHandler(db);

            // Act
            var result = await handler.Handle(new GetDeletedTasksQuery(), CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal(2, result.Data!.Count);
        }
    }
}