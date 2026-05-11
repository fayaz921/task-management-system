using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Features.Admin.Queries.GetAllUsers;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.AdminTests
{
    public class GetAllUsersHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ReturnsAllUsers()
        {
            // Arrange
            var db = CreateDbContext();
            await db.Users.AddRangeAsync(
                new User { FullName = "John Doe", Email = "john@example.com", PasswordHash = "hash" },
                new User { FullName = "Jane Doe", Email = "jane@example.com", PasswordHash = "hash" }
            );
            await db.SaveChangesAsync();

            var handler = new GetAllUsersHandler(db);

            // Act
            var result = await handler.Handle(new GetAllUsersQuery(), CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal(2, result.Data!.Count);
        }
    }
}