using Microsoft.EntityFrameworkCore;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Domain.Entities;
using TaskManagement.API.Features.Users.Queries.GetUserProfile;
using TaskManagement.API.Infrastructure.Persistence.Data;

namespace TaskManagement.Tests.FeaturesTests.UsersTests
{
    public class GetUserProfileHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ValidUserId_ReturnsUserProfile()
        {
            // Arrange
            var db = CreateDbContext();
            var user = new User { FullName = "John Doe", Email = "john@example.com", PasswordHash = "hash" };
            await db.Users.AddAsync(user);
            await db.SaveChangesAsync();

            var handler = new GetUserProfileHandler(db);
            var query = new GetUserProfileQuery(user.Id);

            // Act
            var result = await handler.Handle(query, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.Equal("John Doe", result.Data!.FullName);
            Assert.Equal("john@example.com", result.Data.Email);
        }

        [Fact]
        public async Task Handle_InvalidUserId_ThrowsNotFoundException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new GetUserProfileHandler(db);
            var query = new GetUserProfileQuery(Guid.NewGuid());

            // Act & Assert
            await Assert.ThrowsAsync<NotFoundException>(
                () => handler.Handle(query, CancellationToken.None));
        }
    }
}