using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Features.Auth.Commands.Login;
using TaskManagement.API.Features.Auth.Commands.Register;
using TaskManagement.API.Infrastructure.Persistence.Data;
using TaskManagement.API.Infrastructure.Services.JWT;

namespace TaskManagement.Tests.FeaturesTests.AuthTests
{
    public class LoginHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        private ITokenService CreateTokenService()
        {
            var jwtSettings = new JwtSettings
            {
                Key = "TestSuperSecretKeyHereMakeItLongEnough123!",
                Issuer = "TaskManagement.API",
                Audience = "TaskManagement.Client",
                ExpireDays = 7
            };
            return new TokenService(Options.Create(jwtSettings));
        }

        private async Task RegisterUser(AppDbContext db)
        {
            var registerHandler = new RegisterHandler(db);
            var command = new RegisterCommand("John Doe", "john@example.com", "Password123!", "Password123!");
            await registerHandler.Handle(command, CancellationToken.None);
        }

        [Fact]
        public async Task Handle_ValidCredentials_ReturnsToken()
        {
            // Arrange
            var db = CreateDbContext();
            await RegisterUser(db);
            var handler = new LoginHandler(db, CreateTokenService());
            var command = new LoginCommand("john@example.com", "Password123!");

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.NotNull(result.Data!.AccessToken);
            Assert.NotNull(result.Data!.RefreshToken);
        }

        [Fact]
        public async Task Handle_InvalidEmail_ThrowsUnauthorizedException()
        {
            // Arrange
            var db = CreateDbContext();
            var handler = new LoginHandler(db, CreateTokenService());
            var command = new LoginCommand("wrong@example.com", "Password123!");

            // Act & Assert
            await Assert.ThrowsAsync<UnauthorizedException>(
                () => handler.Handle(command, CancellationToken.None));
        }

        [Fact]
        public async Task Handle_InvalidPassword_ThrowsUnauthorizedException()
        {
            // Arrange
            var db = CreateDbContext();
            await RegisterUser(db);
            var handler = new LoginHandler(db, CreateTokenService());
            var command = new LoginCommand("john@example.com", "WrongPassword!");

            // Act & Assert
            await Assert.ThrowsAsync<UnauthorizedException>(
                () => handler.Handle(command, CancellationToken.None));
        }
    }
}