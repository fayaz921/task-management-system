using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManagement.API.Features.Auth.Commands.ForgotPassword;
using TaskManagement.API.Features.Auth.Commands.Login;
using TaskManagement.API.Features.Auth.Commands.Logout;
using TaskManagement.API.Features.Auth.Commands.RefreshToken;
using TaskManagement.API.Features.Auth.Commands.Register;
using TaskManagement.API.Features.Auth.Commands.ResetPassword;

namespace TaskManagement.API.Features.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class AuthController(IMediator mediator) : ControllerBase
    {
        private Guid GetUserId() =>
            Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        [HttpPost("register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Register(RegisterCommand command)
        {
            var result = await mediator.Send(command);
            return StatusCode((int)result.Status, result);
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Login(LoginCommand command)
        {
            var result = await mediator.Send(command);
            return StatusCode((int)result.Status, result);
        }

        [HttpPost("refresh-token")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> RefreshToken(RefreshTokenCommand command)
        {
            var result = await mediator.Send(command);
            return StatusCode((int)result.Status, result);
        }

        [Authorize]
        [HttpPost("logout")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> Logout()
        {
            var result = await mediator.Send(new LogoutCommand(GetUserId()));
            return StatusCode((int)result.Status, result);
        }

        [HttpPost("forgot-password")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordCommand command)
        {
            var result = await mediator.Send(command);
            return StatusCode((int)result.Status, result);
        }

        [HttpPost("reset-password")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> ResetPassword(ResetPasswordCommand command)
        {
            var result = await mediator.Send(command);
            return StatusCode((int)result.Status, result);
        }
    }
}
