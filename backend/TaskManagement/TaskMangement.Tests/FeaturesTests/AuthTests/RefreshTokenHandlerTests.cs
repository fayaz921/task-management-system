using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TaskManagement.API.Common.Exceptions;
using TaskManagement.API.Features.Auth.Commands.Login;
using TaskManagement.API.Features.Auth.Commands.RefreshToken;
using TaskManagement.API.Features.Auth.Commands.Register;
using TaskManagement.API.Infrastructure.Persistence.Data;
using TaskManagement.API.Infrastructure.Services.JWT;

namespace TaskManagement.Tests.FeaturesTests.AuthTests
{
    public class RefreshTokenHandlerTests
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

        [Fact]
        public async Task Handle_ValidRefreshToken_ReturnsNewTokens()
        {
            // Arrange
            var db = CreateDbContext();
            var tokenService = CreateTokenService();

            var registerHandler = new RegisterHandler(db);
            await registerHandler.Handle(new RegisterCommand("John Doe", "john@example.com", "Password123!", "Password123!"), CancellationToken.None);

            var loginHandler = new LoginHandler(db, tokenService);
            var loginResult = await loginHandler.Handle(new LoginCommand("john@example.com", "Password123!"), CancellationToken.None);

            var handler = new RefreshTokenHandler(db, tokenService);
            var command = new RefreshTokenCommand(loginResult.Data!.RefreshToken);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            Assert.NotNull(result.Data!.AccessToken);
            Assert.NotNull(result.Data!.RefreshToken);
        }

        [Fact]
        public async Task Handle_InvalidRefreshToken_ThrowsUnauthorizedException()
        {
            // Arrange
            var db = CreateDbContext();
            var tokenService = CreateTokenService();
            var handler = new RefreshTokenHandler(db, tokenService);
            var command = new RefreshTokenCommand("invalid-refresh-token");

            // Act & Assert
            await Assert.ThrowsAsync<UnauthorizedException>(
                () => handler.Handle(command, CancellationToken.None));
        }
    }
}