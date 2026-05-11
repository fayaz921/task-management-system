using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Features.Tasks.Commands.DeleteTask;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.TasksTests
{
    public class DeleteTaskHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidCommand_SoftDeletesTask()
        {
            // Arrange
            var db = CreateDbContext();
            var userId = Guid.NewGuid();
            var task = new TaskItem { Title = "Test Task", UserId = userId, DueDate = DateTime.UtcNow.AddDays(1) };
            await db.Tasks.AddAsync(task);
            await db.SaveChangesAsync();

            var handler = new DeleteTaskHandler(db);
            var command = new DeleteTaskCommand(task.Id, userId);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            var deletedTask = await db.Tasks.FirstOrDefaultAsync(t => t.Id == task.Id);
            Assert.True(deletedTask!.IsDeleted);
            Assert.NotNull(deletedTask.DeletedAt);
        }

        [Fact]
        public async Task Handle_InvalidId_ThrowsNotFoundException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new DeleteTaskHandler(db);
            var command = new DeleteTaskCommand(Guid.NewGuid(), Guid.NewGuid());

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(
                () => handler.Handle(command, CancellationToken.None));
        }
    }
}