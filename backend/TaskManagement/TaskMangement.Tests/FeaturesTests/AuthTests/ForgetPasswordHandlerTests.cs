using Microsoft.EntityFrameworkCore;
using Moq;
using TaskManagement.API.Features.Auth.Commands.ForgotPassword;
using TaskManagement.API.Features.Auth.Commands.Register;
using TaskManagement.API.Infrastructure.Persistence.Data;
using TaskManagement.API.Infrastructure.Services.Email;

namespace TaskManagement.Tests.FeaturesTests.AuthTests
{
    public class ForgotPasswordHandlerTests
    {
        private AppDbContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        [Fact]
        public async Task Handle_ExistingEmail_SendsOtpEmail()
        {
            // Arrange
            var db = CreateDbContext();
            var emailServiceMock = new Mock<IEmailService>();

            var registerHandler = new RegisterHandler(db);
            await registerHandler.Handle(new RegisterCommand("John Doe", "john@example.com", "Password123!", "Password123!"), CancellationToken.None);

            var handler = new ForgotPasswordHandler(db, emailServiceMock.Object);
            var command = new ForgotPasswordCommand("john@example.com");

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            emailServiceMock.Verify(e => e.SendOtpEmailAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<string>()), Times.Once);
        }

        [Fact]
        public async Task Handle_NonExistingEmail_ReturnsSuccessWithoutSendingEmail()
        {
            // Arrange
            var db = CreateDbContext();
            var emailServiceMock = new Mock<IEmailService>();
            var handler = new ForgotPasswordHandler(db, emailServiceMock.Object);
            var command = new ForgotPasswordCommand("notexist@example.com");

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            Assert.True(result.IsSuccess);
            emailServiceMock.Verify(e => e.SendOtpEmailAsync(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.IsAny<string>()), Times.Never);
        }
    }
}