using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Features.Tasks.Queries.GetTaskById;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.TasksTests
{
    public class GetTaskByIdHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidId_ReturnsTask()
        {
            // Arrange
            var db = CreateDbContext();
            var userId = Guid.NewGuid();
            var task = new TaskItem { Title = "Test Task", UserId = userId, DueDate = DateTime.UtcNow.AddDays(1) };
            await db.Tasks.AddAsync(task);
            await db.SaveChangesAsync();

            var handler = new GetTaskByIdHandler(db);
            var query = new GetTaskByIdQuery(task.Id, userId);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal("Test Task", result.Data!.Title);
        }

        [Fact]
        public async Task Handle_InvalidId_ThrowsNotFoundException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new GetTaskByIdHandler(db);
            var query = new GetTaskByIdQuery(Guid.NewGuid(), Guid.NewGuid());

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(
                () => handler.Handle(query, CancellationToken.None));
        }
    }
}